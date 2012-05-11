QUnit.module('New String Methods', {
    setup: function () {
        this.newdate = new Tempus(2011, 8, 11, 13, 0, 0, 0, 0);
        this.date = new FakeDate(2011, 8, 11, 13, 0, 0, 0, 0);
    }
});

covers(Tempus.prototype, 'Tempus', 'toString');
QUnit.test('toString([format fragments])', function () {
    var methods = {
        '2': '%2',
        a: 'Sun',
        A: 'Sunday',
        b: 'Sep',
        B: 'September',
        c: 'Sun Sep 11 13:00:00 2011',
        C: '21',
        d: '11',
        D: '09/11/11',
        e: '11',
        f: '000000',
        F: '2011-09-11',
        g: '11',
        G: '2011',
        h: 'Sep',
        H: '13',
        I: '01',
        j: '254',
        k: '13',
        l: ' 1',
        L: '000',
        m: '09',
        M: '00',
        n: "\n",
        o: 'th',
        p: 'PM',
        P: 'pm',
        r: '01:00:00 PM',
        R: '13:00',
        s: '1315742400',
        S: '00',
        t: "\t",
        T: '13:00:00',
        u: '7',
        U: '36',
        V: '36',
        w: '0',
        W: '36',
        // x: 'Sunday, September 11, 2011',
        // X: '01:00:00 pm',
        y: '11',
        Y: '2011',
        z: '+0100',
        Z: '+01:00',
        '%': '%'
    };
    
    expect(43);

    for(var i in methods) {
        equal(this.newdate.toString('%' + i), methods[i], i + ' - ' + methods[i]);
    }
    
});

covers(Tempus.prototype, 'Tempus', 'toString', 'toCOOKIEString', 'toISOString', 'toRFC822String',
        'toRFC850String', 'toRFC1036String', 'toRFC1123String', 'toRFC2822String', 'toRFC3339String',
        'toRSSString', 'toW3CString', 'toGMTString', 'toNCC1701String', 'toISODateString');
QUnit.test('toString([fomat constants])', function () {
    var methods = {
        '': 'Sun Sep 11 2011 13:00:00 +0100',
        COOKIE: 'Sunday, 11-Sep-11 13:00:00 +01:00',
        ISODate: '2011-09-11',
        ISO: '2011-09-11T13:00:00.000+0100',
        RFC822: 'Sun, 11 Sep 11 13:00:00 +0100',
        RFC850: 'Sunday, 11-Sep-11 13:00:00 +01:00',
        RFC1036: 'Sun, 11 Sep 11 13:00:00 +0100',
        RFC1123: 'Sun, 11 Sep 2011 13:00:00 +0100',
        RFC2822: 'Sun, 11 Sep 2011 13:00:00 +0100',
        RFC3339: '2011-09-11T13:00:00+01:00',
        RSS: 'Sun, 11 Sep 2011 13:00:00 +0100',
        W3C: '2011-09-11T13:00:00+01:00',
        NCC1701: '2011.254'
    };
    
    expect(27);
    
    for(var i in methods) {
        // Both newdate.to[i]String() an newdate.toString(i) should work
        equal(this.newdate.toString(i), methods[i], i + ' - ' + methods[i]);
        equal(this.newdate['to' + i + 'String'](), methods[i], i + ' - ' + methods[i]);
    }

    equal(this.newdate.toGMTString(), this.date.toGMTString(), 'GMT');
    
});

covers(Tempus.prototype, 'Tempus', 'toJSON');
QUnit.test('toJSON()', function () {
    // This'll do
    equal(Tempus.prototype.toJSON === Tempus.prototype.toISOString, true, 'toJSON is the same as toISOString');
});