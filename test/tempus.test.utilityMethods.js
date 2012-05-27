QUnit.module('Duplicating Date Instances');

covers(Tempus.prototype, 'Tempus', 'clone');
QUnit.test('clone()', function () {
    var newdate = new Tempus(1315774123600)
    ,   cloneddate = newdate.clone();
    
    equal(Number(cloneddate), 1315774123600, String(cloneddate));
    equal(cloneddate.timezone(), newdate.timezone(), String(cloneddate));
    
    newdate.timeStamp(1);
    equal(Number(cloneddate), 1315774123600, String(cloneddate));
    equal(Number(newdate), 1000, String(newdate));
});

covers(Tempus.prototype, 'Tempus', 'copy');
QUnit.test('copy()', function () {
    var newdate = new Tempus(1315774123600)
    ,   copieddate = new Tempus();
    
    copieddate.copy(newdate);
    
    equal(Number(copieddate), 1315774123600, 'Copied date has same timestamp');
    equal(copieddate.timezone(), newdate.timezone(), 'Copied date has same timezone');
    
    newdate.timeStamp(1);
    equal(Number(newdate), 1000, 'Old date has changed');
    equal(Number(copieddate), 1315774123600, 'Copied date isnt effected by old date changes');
    
    copieddate.timeStamp(1315774000);
    equal(Number(copieddate), 1315774000000, 'Copied date has changed');
    equal(Number(newdate), 1000, 'Old date isnt effected by copied date changes');

    var date = new Date(1338143052240);
    copieddate = new Tempus();
    
    copieddate.copy(date);
    
    equal(Number(copieddate), 1338143052240, 'Copied date has same timestamp (Date())');
    equal(copieddate.timezone(), newdate.timezone(), 'Copied date has same timezone (Date())');
    
    newdate.timeStamp(1);
    equal(Number(newdate), 1000, 'Old date has changed (Date())');
    equal(Number(copieddate), 1338143052240, 'Copied date isnt effected by old date changes (Date())');
    
    copieddate.timeStamp(1315774000);
    equal(Number(copieddate), 1315774000000, 'Copied date has changed (Date())');
    equal(Number(newdate), 1000, 'Old date isnt effected by copied date changes (Date())');
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