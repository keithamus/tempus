QUnit.module('Interval');
// Clean up coverage for Tempus.*
covers(Tempus, 'Tempus.*', 'Interval');

covers(Tempus.Interval.prototype, 'Interval', 'constructor');
QUnit.test("new Interval()", function () {
    
    var interval = new Tempus.Interval(new Tempus(), new Tempus());

    ok(interval instanceof Tempus.Interval, 'Interval returns interval');

    raises(function () {
        new Tempus.Interval();
    },
    /^Error: Invalid Date$/, 'Tempus.Interval() raises "Invalid Date" with no arguments');

});

QUnit.test("Interval() as a factory method", function () {
    
    var interval = Tempus.Interval(new Tempus(), new Tempus());

    ok(interval instanceof Tempus.Interval, 'Interval returns interval');

    raises(function () {
        Tempus.Interval();
    },
    /^Error: Invalid Date$/, 'Tempus.Interval() raises "Invalid Date" with no arguments');

});

covers(Tempus.Interval.prototype, 'Interval', 'valueOf');
QUnit.test('valueOf()', function () {

    var interval = Tempus.Interval(new Tempus(), new Tempus(+(new Tempus())+1));
    equal(interval.valueOf(), 1, 'valueOf() gets time difference in MS');

    interval = Tempus.Interval(new Tempus(), new Tempus(+(new Tempus())+600));
    equal(interval.valueOf(), 600, 'valueOf() gets time difference in MS');

    interval = Tempus.Interval(new Tempus(0), new Tempus(100));
    equal(interval.valueOf(), 100, 'valueOf() gets time difference in MS');

    interval = Tempus.Interval(new Tempus(942520000), new Tempus(942523519));
    equal(interval.valueOf(), 3519, 'valueOf() gets time difference in MS');

    interval = Tempus.Interval(new Tempus(942523519), new Tempus(942520000));
    equal(interval.valueOf(), -3519, 'valueOf() always does from - to');
});

QUnit.test("Interval() takes Tempus dates as args", function () {

    FakeDate.stubTimezone = true;

    equal(+(new Tempus.Interval(942520000, 942523519)), 3519, 'Interval can set on numbers like Tempus');
    equal(+(new Tempus.Interval('Sun, 11 Sep 2011 21:48:43 GMT', 'Sun, 11 Sep 2011 21:48:44 GMT')), 1000, 'Interval can set on strings like Tempus');
    equal(+(new Tempus.Interval('2012-12-21T06:06:06.123+0000', '2012-12-21T06:06:06.124+0000')), 1, 'Interval can set on strings like Tempus');

    equal(+(new Tempus.Interval([2011, 8], new Tempus())), 942523519, 'Interval can set on arrays like Tempus');
    equal(+(new Tempus.Interval([2011, 8, 11], new Tempus())), 78523519, 'Interval can set on arrays like Tempus');
    equal(+(new Tempus.Interval([2011, 8, 11, 21], new Tempus())), 2923519, 'Interval can set on arrays like Tempus');
    equal(+(new Tempus.Interval([2011, 8, 11, 21, 48], new Tempus())), 43519, 'Interval can set on arrays like Tempus');
    equal(+(new Tempus.Interval([2011, 8, 11, 21, 48, 43], new Tempus())), 519, 'Interval can set on arrays like Tempus');
    equal(+(new Tempus.Interval([2011, 8, 11, 21, 48, 43, 519], new Tempus())), 0, 'Interval can set on arrays like Tempus');

    Tempus.addParser(function () { return true; }, function (ob) {
        return this.set.apply(this, ob.args || [2011, 0, 1, 12, 30, 0]);
    }, 'object');

    equal(Tempus.Interval({ args: [0] }, { args: [1]}), 1, 'Interval uses parsers from Tempus');

    FakeDate.stubTimezone = true;
});

covers(Tempus.Interval.prototype, 'Interval', 'diffFullYear', 'diffMonth', 'diffDate', 'diffHours',
    'diffMinutes', 'diffSeconds', 'diffMilliseconds');
QUnit.test('diff*()', function () {
    var newdate = new Tempus(0), newdateclone, interval;

    newdateclone = newdate.clone();
    interval = new Tempus.Interval(newdate, newdateclone);

    ok(1, newdate.toISOString() + ' - ' + newdateclone.toISOString());
    equal(interval.diffFullYear(),     0, 'No extra years');
    equal(interval.diffMonth(),        0, 'No extra months');
    equal(interval.diffDate(),         0, 'No extra days');
    equal(interval.diffHours(),        0, 'No extra hours');
    equal(interval.diffMinutes(),      0, 'No extra minutes');
    equal(interval.diffSeconds(),      0, 'No extra seconds');
    equal(interval.diffMilliseconds(), 0, 'No extra milliseconds');

    newdateclone = newdate.clone().addYear(2);
    interval = new Tempus.Interval(newdate, newdateclone);

    ok(1, newdate.toISOString() + ' - ' + newdateclone.toISOString());
    equal(interval.diffFullYear(),     2, '1 extra years');
    equal(interval.diffMonth(),        0, 'No extra months');
    equal(interval.diffDate(),         0, 'No extra days');
    equal(interval.diffHours(),        0, 'No extra hours');
    equal(interval.diffMinutes(),      0, 'No extra minutes');
    equal(interval.diffSeconds(),      0, 'No extra seconds');
    equal(interval.diffMilliseconds(), 0, 'No extra milliseconds');

    newdateclone = newdate.clone().addMonth(3);
    interval = new Tempus.Interval(newdate, newdateclone);

    ok(1, newdate.toISOString() + ' - ' + newdateclone.toISOString());
    equal(interval.diffFullYear(),     0, 'No extra years');
    equal(interval.diffMonth(),        3, '3 extra months');
    equal(interval.diffDate(),         0, 'No extra days');
    equal(interval.diffHours(),        0, 'No extra hours');
    equal(interval.diffMinutes(),      0, 'No extra minutes');
    equal(interval.diffSeconds(),      0, 'No extra seconds');
    equal(interval.diffMilliseconds(), 0, 'No extra milliseconds');

    newdateclone = newdate.clone().addDate(3);
    interval = new Tempus.Interval(newdate, newdateclone);

    ok(1, newdate.toISOString() + ' - ' + newdateclone.toISOString());
    equal(interval.diffFullYear(),     0, 'No extra years');
    equal(interval.diffMonth(),        0, 'No extra months');
    equal(interval.diffDate(),         3, '3 extra days');
    equal(interval.diffHours(),        0, 'No extra hours');
    equal(interval.diffMinutes(),      0, 'No extra minutes');
    equal(interval.diffSeconds(),      0, 'No extra seconds');
    equal(interval.diffMilliseconds(), 0, 'No extra milliseconds');

    newdateclone = newdate.clone().addHours(1);
    interval = new Tempus.Interval(newdate, newdateclone);

    ok(1, newdate.toISOString() + ' - ' + newdateclone.toISOString());
    equal(interval.diffFullYear(),     0, 'No extra years');
    equal(interval.diffMonth(),        0, 'No extra months');
    equal(interval.diffDate(),         0, 'No extra days');
    equal(interval.diffHours(),        1, '1 extra hours');
    equal(interval.diffMinutes(),      0, 'No extra minutes');
    equal(interval.diffSeconds(),      0, 'No extra seconds');
    equal(interval.diffMilliseconds(), 0, 'No extra milliseconds');

    newdateclone = newdate.clone().addMinutes(3);
    interval = new Tempus.Interval(newdate, newdateclone);

    ok(1, newdate.toISOString() + ' - ' + newdateclone.toISOString());
    equal(interval.diffFullYear(),     0, 'No extra years');
    equal(interval.diffMonth(),        0, 'No extra months');
    equal(interval.diffDate(),         0, 'No extra days');
    equal(interval.diffHours(),        0, 'No extra hours');
    equal(interval.diffMinutes(),      3, '3 extra minutes');
    equal(interval.diffSeconds(),      0, 'No extra seconds');
    equal(interval.diffMilliseconds(), 0, 'No extra milliseconds');

    newdateclone = newdate.clone().addSeconds(3);
    interval = new Tempus.Interval(newdate, newdateclone);

    ok(1, newdate.toISOString() + ' - ' + newdateclone.toISOString());
    equal(interval.diffFullYear(),     0, 'No extra years');
    equal(interval.diffMonth(),        0, 'No extra months');
    equal(interval.diffDate(),         0, 'No extra days');
    equal(interval.diffHours(),        0, 'No extra hours');
    equal(interval.diffMinutes(),      0, 'No extra minutes');
    equal(interval.diffSeconds(),      3, '3 extra seconds');
    equal(interval.diffMilliseconds(), 0, 'No extra milliseconds');

    newdateclone = newdate.clone().addMilliseconds(100);
    interval = new Tempus.Interval(newdate, newdateclone);

    ok(1, newdate.toISOString() + ' - ' + newdateclone.toISOString());
    equal(interval.diffFullYear(),     0, 'No extra years');
    equal(interval.diffMonth(),        0, 'No extra months');
    equal(interval.diffDate(),         0, 'No extra days');
    equal(interval.diffHours(),        0, 'No extra hours');
    equal(interval.diffMinutes(),      0, 'No extra minutes');
    equal(interval.diffSeconds(),      0, 'No extra seconds');
    equal(interval.diffMilliseconds(), 100, '100 extra milliseconds');

    newdateclone = newdate.clone().addYear(1).addMonth(2).addDate(3).addHours(4).
        addMinutes(5).addSeconds(6).addMilliseconds(7);
    interval = new Tempus.Interval(newdate, newdateclone);

    ok(1, newdate.toISOString() + ' - ' + newdateclone.toISOString());
    equal(interval.diffFullYear(),     1, '1 extra years');
    equal(interval.diffMonth(),        2, '2 extra months');
    equal(interval.diffDate(),         3, '3 extra days');
    equal(interval.diffHours(),        4, '4 extra hours');
    equal(interval.diffMinutes(),      5, '5 extra minutes');
    equal(interval.diffSeconds(),      6, '6 extra seconds');
    equal(interval.diffMilliseconds(), 7, '7 extra milliseconds');
    
});

covers(Tempus.Interval.prototype, 'Interval', 'toISOString');
QUnit.test('toISOString()', function () {
    var newdate = new Tempus();

    var interval = Tempus.Interval(newdate, newdate.clone().addMilliseconds(1));
    equal(interval.toISOString(), 'PT1MS', 'toISOString() returns ISO interval string (addition)');

    interval = Tempus.Interval(newdate, newdate.clone().addMonth(1));
    equal(interval.toISOString(), 'P1M', 'toISOString() returns ISO interval string (addition)');

    interval = Tempus.Interval(newdate, newdate.clone().addYear(1).addMonth(1));
    equal(interval.toISOString(), 'P1Y1M', 'toISOString() returns ISO interval string (multiple addition)');

    interval = Tempus.Interval(newdate, newdate.clone().addMonth(1).addHours(2).addMinutes(30));
    equal(interval.toISOString(), 'P1MT2H30M', 'toISOString() returns ISO interval string (multiple addition, overlapping units)');

    interval = Tempus.Interval(newdate, newdate.clone().addDate(7));
    equal(interval.toISOString(), 'P7D', 'toISOString() returns ISO interval string (toISOString will never use W)');

    interval = Tempus.Interval(newdate, newdate.clone().addYear(1).subMonth(2));
    equal(interval.toISOString(), 'P10M', 'toISOString() returns ISO interval string (addition and subtraction)');

    interval = Tempus.Interval(newdate.clone().addYear(1), newdate);
    equal(interval.toISOString(), '-P1Y', 'toISOString() returns ISO interval string (negative dates)');

    interval = Tempus.Interval(newdate.clone().addYear(1).subMonth(1), newdate);
    equal(interval.toISOString(), '-P11M', 'toISOString() returns ISO interval string (negative dates with addition and subtraction)');

    interval = Tempus.Interval(newdate, newdate.clone().addMonth(5));
    equal(interval.toISOString(), 'P5M', 'crossing DST should not effect toISOString');

});

covers(Tempus.Interval.prototype, 'Interval', 'toString');
QUnit.test('toString()', function () {
    var newdate = new Tempus();

    var interval = Tempus.Interval(newdate, newdate.clone().addMilliseconds(1));
    equal(interval.toString(), 'in 1 millisecond', 'toString() returns human readable string (addition)');

    interval = Tempus.Interval(newdate, newdate.clone().addMonth(1));
    equal(interval.toString(), 'in 1 month', 'toString() returns human readable string (addition)');

    interval = Tempus.Interval(newdate, newdate.clone().addYear(1).addMonth(1));
    equal(interval.toString(), 'in 1 year, 1 month', 'toString() returns human readable string (multiple addition)');

    interval = Tempus.Interval(newdate, newdate.clone().addMonth(1).addHours(2).addMinutes(30));
    equal(interval.toString(), 'in 1 month, 2 hours, 30 minutes', 'toString() returns human readable string (multiple addition, overlapping units)');

    interval = Tempus.Interval(newdate, newdate.clone().addDate(7));
    equal(interval.toString(), 'in 7 days', 'toString() returns human readable string (toString will never use W)');

    interval = Tempus.Interval(newdate, newdate.clone().addYear(1).subMonth(2));
    equal(interval.toString(), 'in 10 months', 'toString() returns human readable string (addition and subtraction)');

    interval = Tempus.Interval(newdate.clone().addYear(1), newdate);
    equal(interval.toString(), '1 year ago', 'toString() returns human readable string (negative dates)');

    interval = Tempus.Interval(newdate.clone().addYear(1).subMonth(1), newdate);
    equal(interval.toString(), '11 months ago', 'toString() returns human readable string (negative dates with addition and subtraction)');

    interval = Tempus.Interval(newdate, newdate.clone().addMonth(5));
    equal(interval.toString(), 'in 5 months', 'crossing DST should not effect toString');
});

covers(Tempus.Interval.prototype, 'Interval', 'swap');
QUnit.test('swap()', function () {
    var newdate = new Tempus(),
        newdateclone = newdate.clone().addYear(1),
        interval = new Tempus.Interval(newdate, newdateclone);

    equal(interval.valueOf(), 31622400000, 'Positive number beore swap');

    equal(interval.swap().valueOf(), -31622400000, 'Negative number after swap');
});

covers(Tempus.Interval.prototype, 'Interval', 'toJSON');
QUnit.test('toJSON()', function () {
    
    equal(Tempus.Interval.prototype.toJSON === Tempus.Interval.prototype.toISOString, true, 'toJSON is toISOString');
});

