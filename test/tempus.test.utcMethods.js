QUnit.module('UTC Methods');

covers(Tempus.prototype, 'Tempus', 'UTCHours', 'getUTCHours', 'setUTCHours', 'addUTCHours', 'subUTCHours');
QUnit.test("UTC Hours methods", function () {
    
    var newdate = new Tempus(2011, 8, 11, 9, 30, 0);
    newdate.timezone('+0100');

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.hours(), 9, 'hours() is 9AM');
    equal(newdate.UTCHours(), 8, 'UTCHours() is 8AM UTC');
    equal(newdate.getUTCHours(), 8, 'getUTCHours() is 8AM UTC');

    newdate.setUTCHours(10);

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.hours(), 11, 'hours() is 11AM');
    equal(newdate.UTCHours(), 10, 'UTCHours() is 10AM UTC');
    equal(newdate.getUTCHours(), 10, 'getUTCHours() is 10AM UTC');

    newdate.subUTCHours(2);

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.hours(), 9, 'hours() is 9AM');
    equal(newdate.UTCHours(), 8, 'UTCHours() is 8AM UTC');
    equal(newdate.getUTCHours(), 8, 'getUTCHours() is 8AM UTC');

    newdate.addUTCHours(5);

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.hours(), 14, 'hours() is 14AM');
    equal(newdate.UTCHours(), 13, 'UTCHours() is 13AM UTC');
    equal(newdate.getUTCHours(), 13, 'getUTCHours() is 13AM UTC');
});

covers(Tempus.prototype, 'Tempus', 'UTCOrdinalHours', 'getUTCOrdinalHours', 'setUTCOrdinalHours', 'addUTCOrdinalHours', 'subUTCOrdinalHours');
QUnit.test("UTC Ordinal Hours methods", function () {
    
    var newdate = new Tempus(2011, 8, 11, 9, 30, 0);
    newdate.timezone('+0100');



    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.hours(), 9, 'hours() is 9AM');
    equal(newdate.UTCOrdinalHours(), 8, 'UTCOrdinalHours() is 8AM UTC');
    equal(newdate.getUTCOrdinalHours(), 8, 'getUTCOrdinalHours() is 8AM UTC');

    newdate.setUTCOrdinalHours(10);

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.hours(), 11, 'hours() is 11AM');
    equal(newdate.UTCOrdinalHours(), 10, 'UTCOrdinalHours() is 10AM UTC');
    equal(newdate.getUTCOrdinalHours(), 10, 'getUTCOrdinalHours() is 10AM UTC');

    newdate.subUTCOrdinalHours(2);

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.hours(), 9, 'hours() is 9AM');
    equal(newdate.UTCOrdinalHours(), 8, 'UTCOrdinalHours() is 8AM UTC');
    equal(newdate.getUTCOrdinalHours(), 8, 'getUTCOrdinalHours() is 8AM UTC');

    newdate.addUTCOrdinalHours(5);

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.hours(), 14, 'hours() is 14AM');
    equal(newdate.UTCOrdinalHours(), 1, 'UTCOrdinalHours() is 1AM UTC');
    equal(newdate.getUTCOrdinalHours(), 1, 'getUTCOrdinalHours() is 1AM UTC');
});

covers(Tempus.prototype, 'Tempus', 'UTCDay', 'getUTCDay', 'setUTCDay', 'addUTCDay', 'subUTCDay', 'UTCISODay', 'getUTCISODay', 'setUTCISODay', 'addUTCISODay', 'subUTCISODay');
QUnit.test("UTC Day and UTC ISO day methods", function () {

    var newdate = new Tempus(2011, 8, 11, 23, 30, 0); // Sunday
    newdate.timezone('+0000');

    equal(newdate.timezone(), '+0000', String(newdate));
    equal(newdate.day(), 0, 'day() is 0');
    equal(newdate.UTCDay(), 0, 'UTCDay() is 0');
    equal(newdate.getUTCDay(), 0, 'getUTCDay() is 0');
    equal(newdate.UTCISODay(), 7, 'UTCISODay() is 7');
    equal(newdate.getUTCISODay(), 7, 'getUTCISODay() is 7');

    newdate.timezone('+0100');

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.day(), 1, 'day() is 1');
    equal(newdate.UTCDay(), 0, 'UTCDay() is 0');
    equal(newdate.getUTCDay(), 0, 'getUTCDay() is 0');
    equal(newdate.UTCISODay(), 7, 'UTCISODay() is 7');
    equal(newdate.getUTCISODay(), 7, 'getUTCISODay() is 7');

    newdate.setUTCDay(3); // Wednesday

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.day(), 4, 'day() is 4');
    equal(newdate.UTCDay(), 3, 'UTCDay() is 3');
    equal(newdate.getUTCDay(), 3, 'getUTCDay() is 3');
    equal(newdate.UTCISODay(), 3, 'UTCISODay() is 3');
    equal(newdate.getUTCISODay(), 3, 'getUTCISODay() is 3');

    newdate.setUTCISODay(1); // Monday

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.day(), 2, 'day() is 2');
    equal(newdate.UTCDay(), 1, 'UTCDay() is 1');
    equal(newdate.getUTCDay(), 1, 'getUTCDay() is 1');
    equal(newdate.UTCISODay(), 1, 'UTCISODay() is 1');
    equal(newdate.getUTCISODay(), 1, 'getUTCISODay() is 1');

    newdate.addUTCDay(3); // Thursday

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.day(), 5, 'day() is 5');
    equal(newdate.UTCDay(), 4, 'UTCDay() is 4');
    equal(newdate.getUTCDay(), 4, 'getUTCDay() is 4');
    equal(newdate.UTCISODay(), 4, 'UTCISODay() is 4');
    equal(newdate.getUTCISODay(), 4, 'getUTCISODay() is 4');

    newdate.addUTCISODay(1); // Friday

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.day(), 6, 'day() is 6');
    equal(newdate.UTCDay(), 5, 'UTCDay() is 5');
    equal(newdate.getUTCDay(), 5, 'getUTCDay() is 5');
    equal(newdate.UTCISODay(), 5, 'UTCISODay() is 5');
    equal(newdate.getUTCISODay(), 5, 'getUTCISODay() is 5');

    newdate.subUTCDay(1); // Thursday

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.day(), 5, 'day() is 5');
    equal(newdate.UTCDay(), 4, 'UTCDay() is 4');
    equal(newdate.getUTCDay(), 4, 'getUTCDay() is 4');
    equal(newdate.UTCISODay(), 4, 'UTCISODay() is 4');
    equal(newdate.getUTCISODay(), 4, 'getUTCISODay() is 4');

    newdate.subUTCISODay(1); // Wednesday

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.day(), 4, 'day() is 4');
    equal(newdate.UTCDay(), 3, 'UTCDay() is 3');
    equal(newdate.getUTCDay(), 3, 'getUTCDay() is 3');
    equal(newdate.UTCISODay(), 3, 'UTCISODay() is 3');
    equal(newdate.getUTCISODay(), 3, 'getUTCISODay() is 3');

});

covers(Tempus.prototype, 'Tempus', 'UTCMonth', 'getUTCMonth', 'setUTCMonth', 'addUTCMonth', 'subUTCMonth', 'UTCOneIndexedMonth', 'getUTCOneIndexedMonth', 'setUTCOneIndexedMonth', 'addUTCOneIndexedMonth', 'subUTCOneIndexedMonth');
QUnit.test("UTC Month and UTC one indexed month methods", function () {

    var newdate = new Tempus(2011, 0, 31, 23, 30, 0); // SunMonth
    newdate.timezone('+0000');

    equal(newdate.timezone(), '+0000', String(newdate));
    equal(newdate.month(), 0, 'month() is 0');
    equal(newdate.UTCMonth(), 0, 'UTCMonth() is 0');
    equal(newdate.getUTCMonth(), 0, 'getUTCMonth() is 0');
    equal(newdate.UTCOneIndexedMonth(), 1, 'UTCOneIndexedMonth() is 1');
    equal(newdate.getUTCOneIndexedMonth(), 1, 'getUTCOneIndexedMonth() is 1');

    newdate.timezone('+0100');

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.month(), 1, 'month() is 1');
    equal(newdate.UTCMonth(), 0, 'UTCMonth() is 0');
    equal(newdate.getUTCMonth(), 0, 'getUTCMonth() is 0');
    equal(newdate.UTCOneIndexedMonth(), 1, 'UTCOneIndexedMonth() is 1');
    equal(newdate.getUTCOneIndexedMonth(), 1, 'getUTCOneIndexedMonth() is 1');

    newdate.setUTCMonth(2); // March

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.month(), 3, 'month() is 3');
    equal(newdate.UTCMonth(), 2, 'UTCMonth() is 2');
    equal(newdate.getUTCMonth(), 2, 'getUTCMonth() is 2');
    equal(newdate.UTCOneIndexedMonth(), 3, 'UTCOneIndexedMonth() is 3');
    equal(newdate.getUTCOneIndexedMonth(), 3, 'getUTCOneIndexedMonth() is 3');

    newdate.setUTCOneIndexedMonth(4); // May

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.month(), 5, 'month() is 5');
    equal(newdate.UTCMonth(), 4, 'UTCMonth() is 4');
    equal(newdate.getUTCMonth(), 4, 'getUTCMonth() is 4');
    equal(newdate.UTCOneIndexedMonth(), 5, 'UTCOneIndexedMonth() is 5');
    equal(newdate.getUTCOneIndexedMonth(), 5, 'getUTCOneIndexedMonth() is 5');

    newdate.addUTCMonth(7); // December

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.month(), 0, 'month() is 0');
    equal(newdate.UTCMonth(), 11, 'UTCMonth() is 11');
    equal(newdate.getUTCMonth(), 11, 'getUTCMonth() is 11');
    equal(newdate.UTCOneIndexedMonth(), 12, 'UTCOneIndexedMonth() is 12');
    equal(newdate.getUTCOneIndexedMonth(), 12, 'getUTCOneIndexedMonth() is 12');

    newdate.addUTCOneIndexedMonth(1); // January

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.month(), 1, 'month() is 1');
    equal(newdate.UTCMonth(), 0, 'UTCMonth() is 0');
    equal(newdate.getUTCMonth(), 0, 'getUTCMonth() is 0');
    equal(newdate.UTCOneIndexedMonth(), 1, 'UTCOneIndexedMonth() is 1');
    equal(newdate.getUTCOneIndexedMonth(), 1, 'getUTCOneIndexedMonth() is 1');

    newdate.subUTCOneIndexedMonth(3); // October

    equal(newdate.timezone(), '+0100', String(newdate));
    equal(newdate.month(), 10, 'month() is 10');
    equal(newdate.UTCMonth(), 9, 'UTCMonth() is 9');
    equal(newdate.getUTCMonth(), 9, 'getUTCMonth() is 9');
    equal(newdate.UTCOneIndexedMonth(), 10, 'UTCOneIndexedMonth() is 10');
    equal(newdate.getUTCOneIndexedMonth(), 10, 'getUTCOneIndexedMonth() is 10');

});