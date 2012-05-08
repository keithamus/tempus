/*jslint laxcomma: true */
var objectCoverage = {}
,	reallyDone = false;

function indexOf(a, v) {
    var i;
    for (i = 0; i != a.length; ++i) if (a[i] === v) return i;
    return -1;
}

// Some useful functions for finding out what coverage we have:
var covers = function (object, ObjectName) {
    var obj = objectCoverage[ObjectName] || (objectCoverage[ObjectName || Object.prototype.toString.call(object)] = {
        object: object,
        coverage: []
    });
    for (i = 2; i < arguments.length; ++i) {
        if (indexOf(obj.coverage, arguments[i]) === -1) {
            obj.coverage.push(arguments[i]);
        }
    }
};

var done = function (args) {
    if ( args.passed && args.total && !reallyDone) {
        reallyDone = true;
        QUnit.module('Test Coverage');
        QUnit.test('Analysis', function () {
            var fnNames
            ,   ob
            ,   success;

            
            for (var obName in objectCoverage) {
                fnNames = [];
                ob = objectCoverage[obName];
                

                for (var fnName in ob.object) {
                    if (typeof ob.object[fnName] === 'function') {
                        success = indexOf(ob.coverage, fnName) !== -1;
                        ok(success, 'Coverage for ' + fnName + (success ? ' added' : ' not present!'));
                    }
                }

            }

        });
    }
};

if (typeof module != 'undefined' && module.exports) {
	module.exports = {
		covers: covers,
		done: done
	};
} else {
	this.done = done;
	this.covers = covers;
}