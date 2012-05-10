QUnit.module('Test Core Methods');

covers(Tempus, 'Tempus', 'addLocale');
QUnit.test('addLocale()', function () {
    expect(42);
    
    var newdate
    ,   i
    ,   n
    ,   SHORTMONTHS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L' ]
    ,   FULLMONTHS  = ['AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ', 'KK', 'LL' ]
    ,   SHORTDAYS   = ['M', 'N', 'O', 'P', 'Q', 'R', 'S' ]
    ,   FULLDAYS    = ['MM', 'NN', 'OO', 'PP', 'QQ', 'RR', 'SS' ]
    ,   AMPM        = ['T', 'U', 't', 'u'];


    Tempus.addLocale('test', FULLMONTHS, SHORTMONTHS, FULLDAYS, SHORTDAYS, AMPM);
    

    n = 22;
    i = 7;
    while(i--) {
        newdate = new Tempus(2011, 0, n--);
        newdate.LOCALE = 'test';
        equal(newdate.getDayName(), SHORTDAYS[i], 'getDayName() == ' + SHORTDAYS[i]);
        equal(newdate.getFullDayName(), FULLDAYS[i], 'getFullDayName() == ' + FULLDAYS[i]);
    }

    i = 12;
    while(i--) {
        newdate = new Tempus(2011, i);
        newdate.LOCALE = 'test';
        equal(newdate.getMonthName(), SHORTMONTHS[i], 'getMonthName() == ' + SHORTMONTHS[i]);
        equal(newdate.getFullMonthName(), FULLMONTHS[i], 'getFullMonthName() == ' + FULLMONTHS[i]);
    }

    newdate = new Tempus(2011, 0, 1, 11, 30, 0);
    newdate.LOCALE = 'test';

    equal(newdate.AMPM(), 'T');
    equal(newdate.ampm(), 't');

    newdate.hours(15);
    equal(newdate.AMPM(), 'U');
    equal(newdate.ampm(), 'u');

});

covers(Tempus, 'Tempus', 'now');
QUnit.test('now()', function () {

    equal(Tempus.now(), 1315774123519, 'Tempus.now() is Number(date)');

    FakeDate.time = 1315774123543;
    equal(Tempus.now(), 1315774123543, 'Tempus.now() is Number(date)');

    FakeDate.time = 10233;
    equal(Tempus.now(), 10233, 'Tempus.now() is Number(date)');

    FakeDate.time = 1315774123519;

});