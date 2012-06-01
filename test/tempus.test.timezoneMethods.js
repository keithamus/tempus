QUnit.module('Timezone Methods');

covers(Tempus.prototype, 'Tempus', 'getTimezone', 'timezone', 'getISOTimezone', 'ISOTimezone', 'timezoneOffset', 'getTimezoneOffset', 'setTimezoneOffset', 'setTimezone', 'setISOTimezone');
QUnit.test("getTimezone()/timezone() and getISOTimezone()/ISOTimezone() and timezoneOffset() and setTimezone()/timezone(n) and setISOTimezone()/ISOTimezone(n)", function () {
    
    var newdate = new Tempus(2011, 8, 11, 9, 30, 0);
    newdate.timezoneOffset(-60);

    equal(newdate.getTimezone(), '+0100', String(newdate));
    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.getISOTimezone(), '+01:00', String(newdate));
    equal(newdate.ISOTimezone(), '+01:00', String(newdate));
    equal(newdate.timezoneOffset(), -60, String(newdate));
    equal(newdate.getTimezoneOffset(), -60, String(newdate));
    equal(newdate.hours(), 9, '9AM');
    equal(newdate.UTCHours(), 8, '8AM UTC');

    newdate.setTimezone('+0200');

    equal(newdate.getTimezone(), '+0200', String(newdate));
    equal(newdate.timezone(), '+0200', String(newdate));
    equal(newdate.getISOTimezone(), '+02:00', String(newdate));
    equal(newdate.ISOTimezone(), '+02:00', String(newdate));
    equal(newdate.timezoneOffset(), -120, String(newdate));
    equal(newdate.getTimezoneOffset(), -120, String(newdate));
    equal(newdate.hours(), 10, '10AM');
    equal(newdate.UTCHours(), 8, '8AM UTC');

    newdate.timezone('-04:00');

    equal(newdate.getTimezone(), '-0400', String(newdate));
    equal(newdate.timezone(), '-0400', String(newdate));
    equal(newdate.getISOTimezone(), '-04:00', String(newdate));
    equal(newdate.ISOTimezone(), '-04:00', String(newdate));
    equal(newdate.timezoneOffset(), 240, String(newdate));

    newdate = new Tempus('2011-01-30T17:30:00.000+0800');

    equal(newdate.getTimezone(), '+0800', String(newdate));
    equal(newdate.timezone(), '+0800', String(newdate));
    equal(newdate.getISOTimezone(), '+08:00', String(newdate));
    equal(newdate.ISOTimezone(), '+08:00', String(newdate));
    equal(newdate.timezoneOffset(), -480, String(newdate));
    equal(newdate.getTimezoneOffset(), -480, String(newdate));
    equal(newdate.hours(), 17, '5PM');
    equal(newdate.UTCHours(), 9, '9AM UTC');

    newdate.setISOTimezone('+0200');

    equal(newdate.getTimezone(), '+0200', String(newdate));
    equal(newdate.timezone(), '+0200', String(newdate));
    equal(newdate.getISOTimezone(), '+02:00', String(newdate));
    equal(newdate.ISOTimezone(), '+02:00', String(newdate));
    equal(newdate.timezoneOffset(), -120, String(newdate));
    equal(newdate.getTimezoneOffset(), -120, String(newdate));
    equal(newdate.hours(), 11, '11AM');
    equal(newdate.UTCHours(), 9, '9AM UTC');

    newdate.ISOTimezone('+0100');

    equal(newdate.getTimezone(), '+0100', String(newdate));
    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.getISOTimezone(), '+01:00', String(newdate));
    equal(newdate.ISOTimezone(), '+01:00', String(newdate));
    equal(newdate.timezoneOffset(), -60, String(newdate));
    equal(newdate.getTimezoneOffset(), -60, String(newdate));
    equal(newdate.hours(), 10, '10AM');
    equal(newdate.UTCHours(), 9, '9AM UTC');

    newdate.setTimezoneOffset(-120);

    equal(newdate.getTimezone(), '+0200', String(newdate));
    equal(newdate.timezone(), '+0200', String(newdate));
    equal(newdate.getISOTimezone(), '+02:00', String(newdate));
    equal(newdate.ISOTimezone(), '+02:00', String(newdate));
    equal(newdate.timezoneOffset(), -120, String(newdate));
    equal(newdate.getTimezoneOffset(), -120, String(newdate));
    equal(newdate.hours(), 11, '11AM');
    equal(newdate.UTCHours(), 9, '9AM UTC');

});

covers(Tempus.prototype, 'Tempus', 'setTimezoneToLocale');
QUnit.test("setTimezoneToLocale()", function () {
    newdate = new Tempus('2011-01-30T17:30:00.000+0800');
    newdate.setTimezoneToLocale();

    var offset = new Date(2011, 0, 30, 17, 30, 0).getTimezoneOffset();
    offset = (offset < 1 ? '+' : '-') + '0' + ~~((offset < 0 ? -offset : offset) / 60) + ':' + Tempus.util.stringPad(((offset < 0 ? -offset : offset) % 60), 2);

    equal(newdate.getTimezone(), offset.replace(':',''), String(newdate));
    equal(newdate.timezone(), offset.replace(':',''), String(newdate));
    equal(newdate.getISOTimezone(), offset, String(newdate));
    equal(newdate.ISOTimezone(), offset, String(newdate));
    equal(newdate.timezoneOffset(),  new Date(2011, 0, 30, 17, 30, 0).getTimezoneOffset(), String(newdate));

    newdate = new Tempus('2011-06-30T17:30:00.000+0800');
    newdate.setTimezoneToLocale();
    var offset = new Date(2011, 5, 30, 17, 30, 0).getTimezoneOffset();
    offset = (offset < 1 ? '+' : '-') + '0' + ~~((offset < 0 ? -offset : offset) / 60) + ':' + Tempus.util.stringPad(((offset < 0 ? -offset : offset) % 60), 2);

    equal(newdate.getTimezone(), offset.replace(':',''), String(newdate));
    equal(newdate.timezone(), offset.replace(':',''), String(newdate));
    equal(newdate.getISOTimezone(), offset, String(newdate));
    equal(newdate.ISOTimezone(), offset, String(newdate));
    equal(newdate.timezoneOffset(),  new Date(2011, 5, 30, 17, 30, 0).getTimezoneOffset(), String(newdate));

});

covers(Tempus.prototype, 'Tempus', 'isDST');
QUnit.test("isDST()", function () {
    
    var dateJan = new Date(2011, 0, 1)
    ,   dateJul = new Date(2011, 5, 1)
    ,   newdateJan = new Tempus(2011, 0)
    ,   newdateJul = new Tempus(2011, 5);

    if (dateJan.getTimezoneOffset() > dateJul.getTimezoneOffset()) {
        equal(newdateJan.isDST(), false, 'Jan is not DST');
        equal(newdateJul.isDST(), true, 'Jul is DST');
    } else if (dateJan.getTimezoneOffset() < dateJul.getTimezoneOffset()) {
        equal(newdateJan.isDST(), true, 'Jan is DST');
        equal(newdateJul.isDST(), false, 'Jul is not DST');
    } else {
        equal(newdateJan.isDST(), false, 'Jan is not DST');
        equal(newdateJul.isDST(), false, 'Jul is not DST');
    }

});


QUnit.test('Ensure hours does not go over 23 from timezoneOffset', function () {

    newdate = new Tempus(2012, 11, 31, 22, 30, 0);

    newdate.timezone('+01:00');

    equal(newdate.hours(), 23, '22 hours +01:00 is 23 hours');
    equal(newdate.toISOString(), '2012-12-31T23:30:00.000+0100', '2012-12-31T23:30:00.000+0100');

    newdate.timezone('+01:30');

    equal(newdate.hours(), 0, '22 hours 30 mins +01:30 is 0 hours the next day');
    equal(newdate.toISOString(), '2013-01-01T00:00:00.000+0130', '2013-01-01T00:00:00.000+0130');

    newdate.timezone('+03:00');

    equal(newdate.hours(), 1, '22 hours +03:00 is 1AM the next day');
    equal(newdate.toISOString(), '2013-01-01T01:30:00.000+0300', '2013-01-01T01:30:00.000+0300');

    newdate.timezone('+04:00');

    equal(newdate.hours(), 2, '22 hours +04:00 is 2AM the next day');
    equal(newdate.toISOString(), '2013-01-01T02:30:00.000+0400', '2013-01-01T02:30:00.000+0400');

    newdate.timezone('+24:00');

    equal(newdate.hours(), 22, '22 hours +24:00 is 22PM the next day');
    equal(newdate.toISOString(), '2013-01-01T22:30:00.000+2400', '2013-01-01T22:30:00.000+2400');

    newdate.timezone('+25:30');

    equal(newdate.hours(), 0, '22 hours +25:30 is 0 hours two days after');
    equal(newdate.toISOString(), '2013-01-02T00:00:00.000+2530', '2013-01-02T00:00:00.000+2530');

});