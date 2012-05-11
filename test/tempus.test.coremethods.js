QUnit.module('Test Core Methods');

covers(Tempus, 'Tempus.*', 'addLocale');
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

covers(Tempus, 'Tempus.*', 'now');
QUnit.test('now()', function () {

    equal(Tempus.now(), 1315774123519, 'Tempus.now() is Number(date)');

    FakeDate.time = 1315774123543;
    equal(Tempus.now(), 1315774123543, 'Tempus.now() is Number(date)');

    FakeDate.time = 10233;
    equal(Tempus.now(), 10233, 'Tempus.now() is Number(date)');

    FakeDate.time = 1315774123519;

});

covers(Tempus, 'Tempus.*', 'addTimeFormat');
QUnit.test('addTimeFormat(name, format)', function () {

    Tempus.addTimeFormat('MyTest', '%Y::%d::%m');

    equal(Tempus().toMyTestString(), '2011::11::09', 'toMyTestString()');

    equal(Tempus().toString('MyTest'), '2011::11::09', 'toString("MyTest")');

    equal(Tempus('2012::01::03', 'MyTest').toISOString(), '2012-03-01T00:00:00.000+0000', 'Tempus("2012::01::03", "MyTest")');
    
    equal(Tempus('2012::06::03').toISOString(), '2012-03-06T00:00:00.000+0000', 'Tempus("2012::01::03")');

    // Clean up for Code Coverage
    delete Tempus.prototype.toMyTestString;
});

covers(Tempus, 'Tempus.*', 'addTimeFormat');
QUnit.test('addTimeFormat(formatObject)', function () {

    Tempus.addTimeFormat({
        'MyDifferentTest': '%Y::%d::%m',
        'MyOtherTest': '%m--!--%d--!--%Y'
    });

    equal(Tempus().toMyDifferentTestString(), '2011::11::09', 'toMyDifferentTestString()');

    equal(Tempus().toString('MyDifferentTest'), '2011::11::09', 'toString("MyDifferentTest")');

    equal(Tempus('2012::01::03', 'MyDifferentTest').toISOString(), '2012-03-01T00:00:00.000+0000', 'Tempus("2012::01::03", "MyDifferentTest")');
    
    equal(Tempus('2012::06::03').toISOString(), '2012-03-06T00:00:00.000+0000', 'Tempus("2012::01::03")');

    equal(Tempus().toMyOtherTestString(), '09--!--11--!--2011', 'toMyOtherTestString()');

    equal(Tempus().toString('MyOtherTest'), '09--!--11--!--2011', 'toString("MyOtherTest")');

    equal(Tempus('03--!--01--!--2012', 'MyOtherTest').toISOString(), '2012-03-01T00:00:00.000+0000', 'Tempus("03--!--01--!--2012", "MyOtherTest")');
    
    equal(Tempus('03--!--06--!--2012').toISOString(), '2012-03-06T00:00:00.000+0000', 'Tempus("03--!--06--!--2012")');

    // Clean up for Code Coverage
    delete Tempus.prototype.toMyDifferentTestString;
    delete Tempus.prototype.toMyOtherTestString;
});

covers(Tempus, 'Tempus.*', 'addParser');
QUnit.test('addParser', function () {

    var testFnRet = false;

    Tempus.addParser(function () { return testFnRet; }, function (ob) {
        return this.set.apply(this, ob.args || [2011, 0, 1, 12, 30, 0]);
    }, 1, 'object', 'number');

    raises(function () {
        Tempus({});
    },
    /Invalid Date/, 'Test returning false doesnt parse module');

    testFnRet = true;

    equal(Tempus({}).toISOString(), '2011-01-01T12:30:00.000+0000', 'Test returning true, passing [{}] parses date');

    raises(function () {
        Tempus({}, false);
    },
    /Invalid Date/, 'Test returning true, passing [{}, false] doesnt parse module because 2nd arg should be number');
    
    raises(function () {
        Tempus({}, new RegExp());
    },
    /Invalid Date/, 'Test returning true, passing [{}, false] doesnt parse module because 2nd arg should be number');
    
    raises(function () {
        Tempus({}, '');
    },
    /Invalid Date/, 'Test returning true, passing [{}, false] doesnt parse module because 2nd arg should be number');

    equal(Tempus({}).toISOString(), '2011-01-01T12:30:00.000+0000', 'Test returning true, passing [{}] parses date');
});