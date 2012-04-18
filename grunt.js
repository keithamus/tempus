/*jslint laxcomma: true, loopfunc: true */
var terminal  = require('child_process')
,   fs        = require('fs')
,   path      = require('path')
,   nodequnit = require('qunit');

// Helper for terminal commands
function sh(line, callback) {
    var term = terminal.exec(line)
    ,   data = '';

    term.stdout.on('data', function (out) {
        data+=out;
    });

    term.on('exit', function (code) {
        if (callback) {
            callback(code, data);
        }
    });

}

module.exports = function (grunt) {

    grunt.initConfig({
        lint: {
            all: ['tempus.js', 'tempus.interval.js', 'tempus.timer.js']
        },
        min: {
            tempus: {
                src: ['tempus.js'],
                dest: 'tempus.min.js',
                size_target: 4505
            },
            tempus_timer: {
                src: ['tempus.timer.js'],
                dest: 'tempus.timer.min.js'  
            },
            tempus_interval: {
                src: ['tempus.interval.js'],
                dest: 'tempus.interval.min.js'  
            },
            tempus_with_interval: {
                src: ['tempus.with.interval.js'],
                dest: 'tempus.with.interval.min.js'  
            },
            tempus_with_timer: {
                src: ['tempus.with.timer.js'],
                dest: 'tempus.with.timer.min.js'  
            },
            tempus_with_timer_and_interval: {
                src: ['tempus.with.timer.and.interval.js'],
                dest: 'tempus.with.timer.and.interval.min.js'  
            }
        },
        uglify: {
            mangle: { top_level: true }
        },
        concat: {
            with_timer: {
                src: ['tempus.js', 'tempus.timer.js'],
                dest: './tempus.with.timer.min.js'
            },
            with_interval: {
                src: ['tempus.js', 'tempus.interval.js'],
                dest: './tempus.with.interval.min.js'
            },
            with_timer_and_interval: {
                src: ['tempus.js', 'tempus.interval.js', 'tempus.timer.js'],
                dest: './tempus.with.timer.and.interval.min.js'
            }
        },
        qunit: {
            index: ['test/index.html']
        }
    });

    grunt.registerTask('qunit-node', function () {
        var done = this.async()
        ,   testFiles = 
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
        , tests = [];

        if (this.length > 0) {
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

    grunt.registerHelper('min_max_info', function(min, max) {
        var gzipSize     = String(grunt.helper('gzip', min).length)
        ,   expectedSize = grunt.task.current.data.size_target || false;

        grunt.log.writeln('Uncompressed size: ' + String(max.length).green + ' bytes.');

        if (!expectedSize) {
            grunt.log.writeln('Compressed size: ' + gzipSize.green + ' bytes gzipped '+
                '(' + String(min.length).green + ' bytes minified).');

            return;
        }
        
        var diff;

        if (gzipSize > expectedSize) {
            diff = gzipSize - expectedSize;
            grunt.log.error('Compressed size: ' + gzipSize.red + ' bytes ' +
                '(' + String(diff).red + ' bytes over ' + expectedSize + ' byte target) gzipped ' +
                '(' + String(min.length).green + ' bytes minified).');
        } else {
            diff = expectedSize - gzipSize;
            grunt.log.writeln('Compressed size: ' + gzipSize.green + ' bytes ' +
                '(' + String(diff).green + ' bytes under ' + expectedSize + ' byte target) gzipped ' +
                '(' + String(min.length).green + ' bytes minified).');
        }
    });

    grunt.registerTask('default', 'lint concat min qunit qunit-node');
};