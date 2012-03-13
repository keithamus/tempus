var qunit = require('qunit');

function testpath(p) {
    return './test/tempus.test.' + p + '.js';
}

qunit.options.globalSummary = false;


var tests = [
    'creation',
    'originalMethods',
    'dateMethods',
    'utilityMethods',
    'yearMethods',
    'monthMethods',
    'weekMethods',
    'dayMethods',
    'timeMethods',
    'stringMethods',
    'highLevelFunctionality',
    'timer'
];

if (process.argv.length > 2 && tests.indexOf(process.argv[2]) !== -1 ) {
	console.log('Filtering ------ ' + process.argv[2]);
	tests = [process.argv[2]];
}


qunit.run({
    code: { path: './test/node.test.bootstrap.js', namespace: 'Tempus' },
    tests: tests.map(testpath)
});