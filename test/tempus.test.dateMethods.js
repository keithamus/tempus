QUnit.module('New Date Methods');

covers(Tempus.prototype, 'Tempus', 'getTimeStamp', 'timeStamp', 'setTimeStamp', 'addTimeStamp', 'subTimeStamp');
QUnit.test('getTimeStamp()/timeStamp() and setTimestamp()', function () {
    var newdate = new Tempus(1315774123519);
    
    equal(newdate.timeStamp(), 1315774123, 'timeStamp');
    equal(newdate.getTimeStamp(), 1315774123, 'getTimeStamp');
    
    newdate.addTimeStamp(1);
    equal(newdate.timeStamp(), 1315774124, 'addTimeStamp');
    
    newdate.subTimeStamp(1);
    equal(newdate.timeStamp(), 1315774123, 'addTimeStamp');
    
    newdate.timeStamp(1);
    equal(Number(newdate), 1000, 'timeStamp(arg)');
    
    newdate.setTimeStamp(1315774123);
    equal(Number(newdate), 1315774123000, 'setTimeStamp');

    newdate.subTimeStamp(4123);
    equal(Number(newdate), 1315770000000, 'subTimeStamp');

    newdate.addTimeStamp(230000);
    equal(Number(newdate), 1316000000000, 'subTimeStamp');
});