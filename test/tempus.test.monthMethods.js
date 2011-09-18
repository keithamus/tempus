QUnit.module('New Month Methods');

covers(Tempus.prototype, 'Tempus', 'getMonth', 'month', 'getOneIndexedMonth', 'oneIndexedMonth');
QUnit.test('getMonth()/month() and getMonth(true)/getOneIndexedMonth()/oneIndexedMonth()', function () {
    var newdate
    ,   i = 12;
    
    expect(60);
    
    while(i--) {
        newdate = new Tempus(2011, i);
        strictEqual(newdate.month(), i, String(newdate));
        strictEqual(newdate.getMonth(), i, String(newdate));
        strictEqual(newdate.getMonth(true), i+1, String(newdate));
        strictEqual(newdate.oneIndexedMonth(), i+1, String(newdate));
        strictEqual(newdate.getOneIndexedMonth(), i+1, String(newdate));
    }
});

covers(Tempus.prototype, 'Tempus', 'setMonth', 'month', 'setOneIndexedMonth');
QUnit.test('setMonth()/month(N), and setOneIndexedMonth()', function () {
    var newdate
    ,   i = 12;
    
    expect(48);
    
    while(i--) {
        newdate = new Tempus(2011, 0).month(i);
        strictEqual(newdate.getMonth(), i, String(newdate));
        
        newdate = new Tempus(2011, 0).setMonth(i);
        strictEqual(newdate.getMonth(), i, String(newdate));
        
        newdate = new Tempus(2011, 0).setOneIndexedMonth(i+1);
        strictEqual(newdate.getMonth(), i, String(newdate));
        
        newdate = new Tempus(2011, 0).oneIndexedMonth(i+1);
        strictEqual(newdate.getMonth(), i, String(newdate));
    } 
});

covers(Tempus.prototype, 'Tempus', 'month');
QUnit.test("month(MONTHNAME)", function () {
    var newdate = new Tempus(2011, 12, 1, 12, 0, 0);

    newdate.month('January');
    equal(newdate.getMonth(), 0);
    newdate.month('Jan');
    equal(newdate.getMonth(), 0);

    newdate.month('February');
    equal(newdate.getMonth(), 1);
    newdate.month('Feb');
    equal(newdate.getMonth(), 1);

    newdate.month('March');
    equal(newdate.getMonth(), 2);
    newdate.month('Mar');
    equal(newdate.getMonth(), 2);

    newdate.month('April');
    equal(newdate.getMonth(), 3);
    newdate.month('Apr');
    equal(newdate.getMonth(), 3);

    newdate.month('May');
    equal(newdate.getMonth(), 4);

    newdate.month('June');
    equal(newdate.getMonth(), 5);
    newdate.month('Jun');
    equal(newdate.getMonth(), 5);

    newdate.month('July');
    equal(newdate.getMonth(), 6);
    newdate.month('Jul');
    equal(newdate.getMonth(), 6);

    newdate.month('August');
    equal(newdate.getMonth(), 7);
    newdate.month('Aug');
    equal(newdate.getMonth(), 7);

    newdate.month('September');
    equal(newdate.getMonth(), 8);
    newdate.month('Sep');
    equal(newdate.getMonth(), 8);

    newdate.month('October');
    equal(newdate.getMonth(), 9);
    newdate.month('Oct');
    equal(newdate.getMonth(), 9);

    newdate.month('November');
    equal(newdate.getMonth(), 10);
    newdate.month('Nov');
    equal(newdate.getMonth(), 10);

    newdate.month('December');
    equal(newdate.getMonth(), 11);
    newdate.month('Dec');
    equal(newdate.getMonth(), 11);
});

covers(Tempus.prototype, 'Tempus', 'getMonthName', 'getFullMonthName');
QUnit.test('getMonthName() and getMonthName(true)/fullMonthName()', function () {
    var newdate
    ,   i = 12;
    
    expect(38);
    
    deepEqual(Tempus.FULLMONTHS, ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'], 'Test FULLMONTHS');
    deepEqual(Tempus.SHORTMONTHS, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
        'Sep', 'Oct', 'Nov', 'Dec'], 'Test SHORTMONTHS');
    
    while(i--) {
        newdate = new Tempus(2011, i);
        equal(newdate.getMonthName(), Tempus.SHORTMONTHS[i], String(newdate));
        equal(newdate.getMonthName(true), Tempus.FULLMONTHS[i], String(newdate));
        equal(newdate.getFullMonthName(), Tempus.FULLMONTHS[i], String(newdate));
    } 
});

covers(Tempus.prototype, 'Tempus', 'getLastDayOfMonth');
QUnit.test('getLastDayOfMonth()', function () {
    var newdate
    ,   days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    ,   i = 12;
    
    expect(13);
    
    while(i--) {
        newdate = new Tempus(2011, i);
        equal(newdate.getLastDayOfMonth(), days[i], String(newdate));
    }
    
    newdate = new Tempus(2008, 1); // leap year feb
    equal(newdate.getLastDayOfMonth(), 29, String(newdate));
});

covers(Tempus.prototype, 'Tempus', 'addOneIndexedMonth', 'subOneIndexedMonth');
QUnit.test('addOneIndexedMonth()/subOneIndexedMonth()', function () {

    newdate = new Tempus(2011, 0);

    equal(newdate.month(), 0, 'Jan (0)');
    
    newdate.addOneIndexedMonth();
    equal(newdate.month(), 1, 'Add 1 - Feb (1)');

    newdate.addOneIndexedMonth(4);
    equal(newdate.month(), 5, 'Add 4 - Jul (5)');

    newdate.addOneIndexedMonth(2);
    equal(newdate.month(), 7, 'Add 2 - Aug (7)');

    newdate.subOneIndexedMonth(4);
    equal(newdate.month(), 3, 'Sub 4 - Apr (3)');

    newdate.addOneIndexedMonth(4);
    equal(newdate.month(), 7, 'Add 4 - Aug (7)');

    newdate.subOneIndexedMonth(6);
    equal(newdate.month(), 1, 'Sub 6 - Feb (1)');
});