/*jslint laxcomma: true, loopfunc: true */
module.exports = function (grunt) {

    grunt.initConfig({
        // We want the 3 main JS files to be linted.
        lint: {
            all: ['tempus.js', 'tempus.interval.js', 'tempus.timer.js']
        },
        // We want to generate 3 new files, which are part of the release build...
        concat: {
            // With timer, which is Tempus and Tempus.Timer in one export
            with_timer: {
                src: ['tempus.js', 'tempus.timer.js'],
                dest: './tempus.with.timer.min.js'
            },
            // With interval, which is Tempus and Tempus.Interval in one export
            with_interval: {
                src: ['tempus.js', 'tempus.interval.js'],
                dest: './tempus.with.interval.min.js'
            },
            // With timer and interval; both modules inside one export with Tempus
            with_timer_and_interval: {
                src: ['tempus.js', 'tempus.interval.js', 'tempus.timer.js'],
                dest: './tempus.with.timer.and.interval.min.js'
            }
        },
        min: {
            // Minifiy Tempus JS, and also specify a target size when gzipped
            tempus: {
                src: ['tempus.js'],
                dest: 'tempus.min.js',
                size_target: 4505
            },
            // Minifiy Tempus.Timer
            tempus_timer: {
                src: ['tempus.timer.js'],
                dest: 'tempus.timer.min.js'
            },
            // Minify Tempus.Interval
            tempus_interval: {
                src: ['tempus.interval.js'],
                dest: 'tempus.interval.min.js'
            },
            // Minify our concated tempus.with.timer
            tempus_with_timer: {
                src: ['tempus.with.timer.js'],
                dest: 'tempus.with.timer.min.js'
            },
            // Minify our concated tempus.with.interval
            tempus_with_interval: {
                src: ['tempus.with.interval.js'],
                dest: 'tempus.with.interval.min.js'
            },
            // Minify our concated tempus.with.timer.and.interval
            // with a target size of 7k
            tempus_with_timer_and_interval: {
                src: ['tempus.with.timer.and.interval.js'],
                dest: 'tempus.with.timer.and.interval.min.js',
                size_target: 7168
            }
        },
        // We want to make sure that UglifyJS compresses as much as it can
        uglify: {
            mangle: { top_level: true }
        },
        // We can load in the QUnit test files for phantom.
        qunit: {
            index: ['test/index.html']
        },
        // We'll load in the specific files Node-QUnit will test:
        'qunit-node': {
            testFiles:
                [   'utils'
                ,   'creation'
                ,   'originalMethods'
                ,   'dateMethods'
                ,   'utilityMethods'
                ,   'yearMethods'
                ,   'monthMethods'
                ,   'weekMethods'
                ,   'dayMethods'
                ,   'timeMethods'
                ,   'timezoneMethods'
                ,   'utcMethods'
                ,   'stringMethods'
                ,   'highLevelFunctionality'
                ,   'timer'
                ]
        }
    });

    /*******************************************************/
    /************************ TASKS ************************/
    /*******************************************************/

    // We want to overload the min_max_info helper, which is part of the
    // minify helper. We're overloading it to work with the size_target
    // delcaration in the initConfig
    grunt.registerHelper('min_max_info', function(min, max) {
        var gzipSize     = String(grunt.helper('gzip', min).length)
        ,   expectedSize = grunt.task.current.data.size_target || false;

        grunt.log.writeln('Uncompressed size: ' + String(max.length).green + ' bytes.');

        // If size_target doesn't exist, do what min_max_info normally does.
        if (!expectedSize) {
            grunt.log.writeln('Compressed size: ' + gzipSize.green + ' bytes gzipped '+
                '(' + String(min.length).green + ' bytes minified).');

            return;
        }
        
        // Get the difference in bytes between the two sizes
        var diff = Math.abs(expectedSize - gzipSize);

        // If we're over, flash up a RED size and say we're over
        if (gzipSize > expectedSize) {
            grunt.log.error('Compressed size: ' + gzipSize.red + ' bytes ' +
                '(' + String(diff).red + ' bytes over ' + expectedSize + ' byte target) gzipped ' +
                '(' + String(min.length).green + ' bytes minified).');
        
        // If we're under, flash up a GREEN size and say we're under
        } else {
            grunt.log.writeln('Compressed size: ' + gzipSize.green + ' bytes ' +
                '(' + String(diff).green + ' bytes under ' + expectedSize + ' byte target) gzipped ' +
                '(' + String(min.length).green + ' bytes minified).');
        }
    });

    grunt.registerTask('qunit-node', 'Run QUnit unit tests in a NodeJS instance.', function () {
        var nodequnit = require('qunit')
        ,   done = this.async()
        ,   testFiles = grunt.config()['qunit-node'].testFiles
        ,   tests = [];

        // Filter tests down if given args
        if (this.args.length > 0) {
            grunt.log.writeln('Filtering to ' + this.args);
            this.args.forEach(function (test) {
                if (testFiles.indexOf(test) !== -1) {
                    tests.push(test);
                }
            });
        } else {
            tests = testFiles;
        }

        // Node-nodeQunit shouldnt log stuff
        nodequnit.log.stats = nodequnit.log.reset = nodequnit.log.print = function () {};
        nodequnit.options = {
            assertions: false,
            errors: false,
            tests: false,
            summary: false,
            globalSummary: false,
            coverage: false,
            deps: null,
            namespace: null
        };

        // We'll collect up all of the failed assertions
        var failures = [];
        nodequnit.log.assertion = function (o) {
            if (!o.result) {
                failures.push(o);
            }
        };

        // Grab the final stats
        var stats = {};
        nodequnit.log.summary = function (o) {
            stats = o;
        };

        // Marker for tests
        nodequnit.log.test = function (result) {
            grunt.log.write(+result.failed > 0 ? 'F'.red : '.');
        };

        // Run the tests
        nodequnit.run({
            code: { path: './test/node.test.bootstrap.js', namespace: 'Tempus' },
            tests: tests.map(function (f) { return './test/tempus.test.' + f + '.js'; })
        }, function () {
            // Log out all failures.
            grunt.log.writeln();
            failures.forEach(function (failure) {
                grunt.log.error((failure.module ? failure.module + ' - ' : '') + failure.test);
                if (failure.message) {
                    grunt.log.error('Message: ' + String(failure.message).magenta);
                }
                if (failure.actual !== failure.expected) {
                    grunt.log.error('Actual: ' + String(failure.actual).magenta);
                    grunt.log.error('Expected: ' + String(failure.expected).magenta);
                }
                if (failure.source) {
                    grunt.log.error(failure.source.replace(/ {4}(at)/g, '  $1'));
                }
                grunt.log.writeln();
            });
            if (failures.length) {
                grunt.warn(stats.failed + '/' + stats.total + ' assertions failed (' +
                    stats.runtime + 'ms)', Math.min(99, 90 + stats.failed));
            } else {
                grunt.log.writeln();
                grunt.log.ok(stats.total + ' assertions passed (' + stats.runtime + 'ms)');
            }
            done();
        });
        grunt.log.writeln();
    });

    grunt.registerTask('default', 'lint concat min qunit qunit-node');
};