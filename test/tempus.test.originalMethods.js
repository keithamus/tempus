QUnit.module('Original Date getter and setter methods', {
    setup: function () {
        this.dmeth = [
            'Date', 'FullYear', 'Hours', 'Milliseconds', 'Minutes', 'Month',
            'Seconds', 'Time', 'UTCDate', 'UTCFullYear', 'UTCHours',
            'UTCMilliseconds', 'UTCMinutes', 'UTCMonth', 'UTCSeconds'
        ];
        this.newdate = new Tempus(1315774123519);
        this.date = new FakeDate(1315774123519);
    }
});

covers(Tempus.prototype, 'Tempus', 'toDateString', 'toLocaleDateString', 'toLocaleTimeString', 'toLocaleString', 'toTimeString', 'toUTCString', 'valueOf');
QUnit.test('to*String() methods and valueOf()', function () {

    var dateMethods = [
        'toDateString',
        'toLocaleDateString',
        'toLocaleTimeString',
        'toLocaleString',
        'toTimeString',
        'toUTCString',
        'valueOf',
        //'toISOString',
        'toGMTString'
    ]
    ,   i = dateMethods.length;
    
    expect(i);
    
    while (i--) {
        equal(this.newdate[dateMethods[i]](), this.date[dateMethods[i]](), 'Testing ' + dateMethods[i]);
    }
});

covers(Tempus.prototype, 'Tempus', 'getDate', 'fullYear', 'hours', 'milliseconds', 'minutes', 'month',
    'seconds', 'time', 'UTCDate', 'UTCFullYear', 'UTCHours', 'UTCMilliseconds', 'UTCMinutes',
    'UTCMonth', 'UTCSeconds', 'getFullYear', 'getHours', 'getMilliseconds', 'getMinutes', 'getMonth',
    'getSeconds', 'getTime', 'getUTCDate', 'getUTCFullYear', 'getUTCHours', 'getUTCMilliseconds',
    'getUTCMinutes', 'getUTCMonth', 'getUTCSeconds');
QUnit.test('Getter methods', function () {
    var i = this.dmeth.length
    ,   methodname;
    
    expect(i);
    
    while (i--) {
        equal(this.newdate['get' + this.dmeth[i]](), this.date['get' + this.dmeth[i]](), 'Testing get' + this.dmeth[i]);
    }
});

covers(Tempus.prototype, 'Tempus', 'setDate', 'setFullYear', 'setHours', 'setMilliseconds', 'setMinutes',
    'setMonth', 'setSeconds', 'setTime', 'setUTCDate', 'setUTCFullYear', 'setUTCHours',
    'setUTCMilliseconds', 'setUTCMinutes', 'setUTCMonth', 'setUTCSeconds', 'addDate', 'addFullYear',
    'addHours', 'addMilliseconds', 'addMinutes', 'addMonth', 'addSeconds', 'addTime',
    'addUTCDate', 'addUTCFullYear', 'addUTCHours', 'addUTCMilliseconds', 'addUTCMinutes', 'addUTCMonth',
    'addUTCSeconds', 'subDate', 'subFullYear', 'subHours', 'subMilliseconds', 'subMinutes', 'subMonth',
    'subSeconds', 'subTime', 'subUTCDate', 'subUTCFullYear', 'subUTCHours', 'subUTCMilliseconds',
    'subUTCMinutes', 'subUTCMonth', 'subUTCSeconds');
QUnit.test('Setter methods, and add and sub', function () {
    var i = this.dmeth.length;
    
    expect(i*3);
    
    while (i--) {
        this.newdate['set' + this.dmeth[i]](1);
        this.date['set' + this.dmeth[i]](1);
        equal(this.newdate['get' + this.dmeth[i]](), 1, 'Testing set' + this.dmeth[i]);
        
        this.newdate['add' + this.dmeth[i]](1);
        equal(this.newdate['get' + this.dmeth[i]](), this.date['get' + this.dmeth[i]]()+1, 'Testing add' + this.dmeth[i]);
        this.newdate['sub' + this.dmeth[i]](1);
        equal(this.newdate['get' + this.dmeth[i]](), this.date['get' + this.dmeth[i]](), 'Testing sub' + this.dmeth[i]);
    }
});

covers(Tempus.prototype, 'Tempus', 'date', 'fullYear', 'hours', 'milliseconds', 'minutes', 'month',
    'seconds', 'time', 'UTCDate', 'UTCFullYear', 'UTCHours', 'UTCMilliseconds', 'UTCMinutes',
    'UTCMonth', 'UTCSeconds');
QUnit.test('Test getter/setter combo methods', function () {
    var i = this.dmeth.length;
    
    expect(i);
    
    while (i--) {
        this.dmeth[i] = this.dmeth[i].replace(/^([A-Z])([^A-Z][a-zA-Z]*)$/, function (a, b, c) {
            return b.toLowerCase() + c;
        });

        this.newdate[this.dmeth[i]](1);
        equal(this.newdate[this.dmeth[i]](), 1, 'Testing set & get ' + this.dmeth[i]);
    }


});