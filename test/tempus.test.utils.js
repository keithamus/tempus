QUnit.module('Test Utils');

covers(Tempus.util, 'Tempus.util', 'realTypeOf');
QUnit.test('realTypeOf with primivites', function () {

    equal(Tempus.util.realTypeOf([]), 'array', '[] is "array"');
    equal(Tempus.util.realTypeOf({}), 'object', '{} is "object"');
    equal(Tempus.util.realTypeOf(''), 'string', '"" is "string"');
    equal(Tempus.util.realTypeOf(false), 'boolean', 'false is "boolean"');
    equal(Tempus.util.realTypeOf(true), 'boolean', 'true is "boolean"');
    equal(Tempus.util.realTypeOf(1), 'number', '1 is "number"');
    equal(Tempus.util.realTypeOf(0.453), 'number', '0.453 is "number"');
    equal(Tempus.util.realTypeOf(/^$/), 'regexp', '/^$/ is "regexp"');
    
    equal(Tempus.util.realTypeOf(new Date()), 'date', 'new Date() is "date"');
    equal(Tempus.util.realTypeOf(new Object()), 'object', 'new Object() is "object"');
    equal(Tempus.util.realTypeOf(new Array()), 'array', 'new Array() is "array"');
    equal(Tempus.util.realTypeOf(new String()), 'string', 'new String() is "string"');
    equal(Tempus.util.realTypeOf(new Boolean()), 'boolean', 'new Boolean() is "boolean"');
    equal(Tempus.util.realTypeOf(new Number()), 'number', 'new Number() is "number"');


    var args = (function () { return arguments })(1,2,3);

    equal(Tempus.util.realTypeOf(args), 'arguments', 'arguments is "arguments"');

});

covers(Tempus.util, 'Tempus.util', 'arrIndexOf');
QUnit.test('arrIndexOf()', function () {

    equal(Tempus.util.arrIndexOf([1, 2, 3], 1), 0, '1 is in 0 on [1,2,3]');
    equal(Tempus.util.arrIndexOf([1, 2, 3], 2), 1, '2 is in 1 on [1,2,3]');
    equal(Tempus.util.arrIndexOf([1, 2, 3], 3), 2, '3 is in 2 on [1,2,3]');
    equal(Tempus.util.arrIndexOf([1, 2, 3], 4), -1, '4 is in -1 on [1,2,3]');
    equal(Tempus.util.arrIndexOf([1, 2, 3], 'hi'), -1, '"hi" is in -1 on [1,2,3]');
    equal(Tempus.util.arrIndexOf([1, 2, 3], []), -1, '[] is in -1 on [1,2,3]');

    equal(Tempus.util.arrIndexOf('hello', "l"), 2, '"l" is in 2 on "hello"');
    equal(Tempus.util.arrIndexOf('hello', "e"), 1, '"e" is in 1 on "hello"');
    equal(Tempus.util.arrIndexOf('hello', "h"), 0, '"h" is in 0 on "hello"');
    equal(Tempus.util.arrIndexOf('hello', "o"), 4, '"o" is in 4 on "hello"');

});

covers(Tempus.util, 'Tempus.util', 'getOrdinal');
QUnit.test('getOrdinal()', function () {

    equal(Tempus.util.getOrdinal(1), 'st', '1 is "st"');
    equal(Tempus.util.getOrdinal(2), 'nd', '2 is "nd"');
    equal(Tempus.util.getOrdinal(3), 'rd', '3 is "rd"');
    equal(Tempus.util.getOrdinal(4), 'th', '4 is "th"');
    equal(Tempus.util.getOrdinal(5), 'th', '5 is "th"');
    equal(Tempus.util.getOrdinal(6), 'th', '6 is "th"');
    equal(Tempus.util.getOrdinal(7), 'th', '7 is "th"');
    equal(Tempus.util.getOrdinal(8), 'th', '8 is "th"');
    equal(Tempus.util.getOrdinal(9), 'th', '9 is "th"');
    equal(Tempus.util.getOrdinal(10), 'th', '10 is "th"');
    equal(Tempus.util.getOrdinal(11), 'th', '11 is "th"');
    equal(Tempus.util.getOrdinal(12), 'th', '12 is "th"');
    equal(Tempus.util.getOrdinal(13), 'th', '13 is "th"');
    equal(Tempus.util.getOrdinal(14), 'th', '14 is "th"');
    equal(Tempus.util.getOrdinal(15), 'th', '15 is "th"');
    equal(Tempus.util.getOrdinal(21), 'st', '21 is "st"');
    equal(Tempus.util.getOrdinal(22), 'nd', '22 is "nd"');
    equal(Tempus.util.getOrdinal(23), 'rd', '23 is "rd"');
    equal(Tempus.util.getOrdinal(31), 'st', '31 is "st"');
    equal(Tempus.util.getOrdinal(32), 'nd', '32 is "nd"');
    equal(Tempus.util.getOrdinal(33), 'rd', '33 is "rd"');
    equal(Tempus.util.getOrdinal(41), 'st', '41 is "st"');
    equal(Tempus.util.getOrdinal(42), 'nd', '42 is "nd"');
    equal(Tempus.util.getOrdinal(43), 'rd', '43 is "rd"');
    equal(Tempus.util.getOrdinal(99), 'th', '99 is "th"');
    equal(Tempus.util.getOrdinal(100), 'th', '100 is "th"');
    equal(Tempus.util.getOrdinal(101), 'st', '101 is "st"');
    equal(Tempus.util.getOrdinal(102), 'nd', '102 is "nd"');
    equal(Tempus.util.getOrdinal(103), 'rd', '103 is "rd"');
    equal(Tempus.util.getOrdinal(104), 'th', '104 is "th"');
    equal(Tempus.util.getOrdinal(111), 'th', '111 is "th"');
    equal(Tempus.util.getOrdinal(201), 'st', '201 is "st"');
    equal(Tempus.util.getOrdinal(211), 'th', '211 is "th"');

});

covers(Tempus.util, 'Tempus.util', 'stringPad');
QUnit.test('stringPad()', function () {

    strictEqual(Tempus.util.stringPad(1, 1), '1', 'stringPad(1, 1) is "1"');
    strictEqual(Tempus.util.stringPad(1, 2), '01', 'stringPad(1, 2) is "01"');
    strictEqual(Tempus.util.stringPad(1, 3), '001', 'stringPad(1, 3) is "001"');
    strictEqual(Tempus.util.stringPad(1, 4), '0001', 'stringPad(1, 4) is "0001"');
    strictEqual(Tempus.util.stringPad(11, 4), '0011', 'stringPad(1, 4) is "0011"');
    strictEqual(Tempus.util.stringPad(111, 4), '0111', 'stringPad(1, 4) is "0111"');
    strictEqual(Tempus.util.stringPad(1111, 4), '1111', 'stringPad(1, 4) is "1111"');

    strictEqual(Tempus.util.stringPad('a', 1), 'a', 'stringPad("a", 1) is "a"');
    strictEqual(Tempus.util.stringPad('a', 2), '0a', 'stringPad("a", 2) is "0a"');
    strictEqual(Tempus.util.stringPad('aa', 2), 'aa', 'stringPad("a", 2) is "aa"');

    strictEqual(Tempus.util.stringPad('a', 2, 1), '1a', 'stringPad("a", 2, 1) is "1a"');
    strictEqual(Tempus.util.stringPad('a', 2, '-'), '-a', 'stringPad("a", 2, "-") is "-a"');
    strictEqual(Tempus.util.stringPad('a', 2, '--'), '--a', 'stringPad("a", 2, "--") is "--a"');
    strictEqual(Tempus.util.stringPad('a', 3, '--'), '----a', 'stringPad("a", 3, "--") is "----a"');
    
    var ob = { toString: function () { return 'h'; } };
    strictEqual(Tempus.util.stringPad(ob, 2, '-'), '-h', 'stringPad will coerce');

});