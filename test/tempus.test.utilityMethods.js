QUnit.module('Duplicating Date Instances');

covers(Tempus.prototype, 'Tempus', 'clone');
QUnit.test('clone()', function () {
    var newdate = new Tempus(1315774123519)
    ,   cloneddate = newdate.clone();
    
    equal(Number(cloneddate), 1315774123519, String(cloneddate));
    equal(cloneddate.timezone(), newdate.timezone(), String(cloneddate));
    
    newdate.timeStamp(1);
    equal(Number(cloneddate), 1315774123519, String(cloneddate));
    equal(Number(newdate), 1000, String(newdate));
});

covers(Tempus.prototype, 'Tempus', 'copy');
QUnit.test('copy()', function () {
    var newdate = new Tempus(1315774123519)
    ,   copieddate = new Tempus();
    
    copieddate.copy(newdate);
    
    equal(Number(copieddate), 1315774123519, String(copieddate));
    equal(copieddate.timezone(), copieddate.timezone(), String(copieddate));
    
    newdate.timeStamp(1);
    equal(Number(copieddate), 1315774123519, String(copieddate));
    equal(Number(newdate), 1000, String(newdate));
    
    copieddate.timeStamp(1315774000);
    equal(Number(copieddate), 1315774000000, String(copieddate));
    equal(Number(newdate), 1000, String(newdate));
});

QUnit.module('Equality Functions');

covers(Tempus.prototype, 'Tempus', 'isEqual');
QUnit.test("isEqual()", function () {
    var newdate = new Tempus(2011, 01, 01, 12, 25, 54, 200);

    equal(newdate.isEqual(new Tempus(2011, 01, 01, 12, 25, 54, 200)), true);
    equal(newdate.isEqual(new Tempus(2011, 01, 01, 12, 25, 54, 500)), false);
    equal(newdate.isEqual(2010, 01, 01, 12, 25, 54, 500), false);
    equal(newdate.isEqual(2011, 01, 01, 12, 25, 54, 200), true);

});

covers(Tempus.prototype, 'Tempus', 'isBefore');
QUnit.test("isBefore()", function () {
    var newdate = new Tempus(2011, 01, 01, 12, 25, 54, 200);

    equal(newdate.isBefore(2012, 01, 01), true);
    equal(newdate.isBefore(new Tempus(1296476754200)), false);
});
covers(Tempus.prototype, 'Tempus', 'isAfter');
QUnit.test("isAfter()", function () {
    var newdate = new Tempus(2011, 01, 01, 12, 25, 54, 200);

    equal(newdate.isAfter(2012, 01, 01), false);
    equal(newdate.isAfter(new Tempus(1296476754200)), true);
});