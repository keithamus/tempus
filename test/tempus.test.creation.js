QUnit.module('Date intializing');

covers(Tempus.prototype, 'Tempus', 'constructor', 'set');
QUnit.test('Date initialise with timestamp', function () {

    equal(''+new FakeDate(+new Tempus(0)), ''+new FakeDate(0), '0');
    equal(''+new FakeDate(+new Tempus(1315774123519)), ''+new FakeDate(1315774123519), '1315774123519');

});

QUnit.test('Date initialise with GMT string', function () {

    equal(''+new FakeDate(+new Tempus('Sun, 11 Sep 2011 21:48:43 GMT')), ''+new FakeDate(1315774123519), 'Sun, 11 Sep 2011 21:48:43 GMT');
    equal(''+new FakeDate(+new Tempus('Sat Jan 14 2012 18:10:32 GMT+0000 (GMT)')), String(new FakeDate('Sat Jan 14 2012 18:10:32 GMT+0000 (GMT)')));

});

QUnit.test('Date initialise with number arguments', function () {

    equal(''+new FakeDate(+new Tempus(2011, 8)), ''+new FakeDate(2011, 8), '2011, 8');
    equal(''+new FakeDate(+new Tempus(2011, 8, 11)), ''+new FakeDate(2011, 8, 11), '2011, 8, 11');
    equal(''+new FakeDate(+new Tempus(2011, 8, 11, 20)), ''+new FakeDate(2011, 8, 11, 20), '2011, 8, 11, 20');
    equal(''+new FakeDate(+new Tempus(2011, 8, 11, 20, 48)), ''+new FakeDate(2011, 8, 11, 20, 48), '2011, 8, 11, 20, 48');
    equal(''+new FakeDate(+new Tempus(2011, 8, 11, 20, 48, 43)), ''+new FakeDate(2011, 8, 11, 20, 48, 43), '2011, 8, 11, 20, 48, 43');
    equal(''+new FakeDate(+new Tempus(2011, 8, 11, 20, 48, 43, 100)), ''+new FakeDate(2011, 8, 11, 20, 48, 43, 100), '2011, 8, 11, 20, 48, 43, 100');

});


QUnit.test('Date initialise with Tempus/Date instances', function () {
    var newdate = new Tempus();

    equal(''+new FakeDate(+new Tempus(newdate)), ''+new FakeDate(+newdate), 'Tempus');
    equal(''+new FakeDate(+new Tempus(new FakeDate())), String(new FakeDate()), 'Date');

});

QUnit.test('Date initialise with first argument array extrapolation', function () {
    var newdate = new Tempus();

    equal(''+new FakeDate(+new Tempus([2011, 8])), ''+new FakeDate(2011, 8), '[2011, 8]');
    equal(''+new FakeDate(+new Tempus([2011, 8, 11])), ''+new FakeDate(2011, 8, 11), '[2011, 8, 11]');
    equal(''+new FakeDate(+new Tempus([2011, 8, 11, 20])), ''+new FakeDate(2011, 8, 11, 20), '[2011, 8, 11, 20]');
    equal(''+new FakeDate(+new Tempus([2011, 8, 11, 20, 48])), ''+new FakeDate(2011, 8, 11, 20, 48), '[2011, 8, 11, 20, 48]');
    equal(''+new FakeDate(+new Tempus([2011, 8, 11, 20, 48, 43])), ''+new FakeDate(2011, 8, 11, 20, 48, 43), '[2011, 8, 11, 20, 48, 43]');
    equal(''+new FakeDate(+new Tempus([2011, 8, 11, 20, 48, 43, 100])), ''+new FakeDate(2011, 8, 11, 20, 48, 43, 100), '[2011, 8, 11, 20, 48, 43, 100]');
    equal(''+new FakeDate(+new Tempus([newdate])), ''+new FakeDate(newdate), '[Tempus]');
    equal(''+new FakeDate(+new Tempus([new FakeDate()])), ''+new FakeDate(new FakeDate()), '[Date]');

});

QUnit.test('Date initialise with first argument as Arguments extrapolation', function () {
    var newdate = new Tempus();

    function argumentFactory() { return arguments; }

    equal(''+new FakeDate(+new Tempus(argumentFactory(2011, 8))), ''+new FakeDate(2011, 8), '[2011, 8]');
    equal(''+new FakeDate(+new Tempus(argumentFactory(2011, 8, 11))), ''+new FakeDate(2011, 8, 11), '[2011, 8, 11]');
    equal(''+new FakeDate(+new Tempus(argumentFactory(2011, 8, 11, 20))), ''+new FakeDate(2011, 8, 11, 20), '[2011, 8, 11, 20]');
    equal(''+new FakeDate(+new Tempus(argumentFactory(2011, 8, 11, 20, 48))), ''+new FakeDate(2011, 8, 11, 20, 48), '[2011, 8, 11, 20, 48]');
    equal(''+new FakeDate(+new Tempus(argumentFactory(2011, 8, 11, 20, 48, 43))), ''+new FakeDate(2011, 8, 11, 20, 48, 43), '[2011, 8, 11, 20, 48, 43]');
    equal(''+new FakeDate(+new Tempus(argumentFactory(2011, 8, 11, 20, 48, 43, 100))), ''+new FakeDate(2011, 8, 11, 20, 48, 43, 100), '[2011, 8, 11, 20, 48, 43, 100]');
    equal(''+new FakeDate(+new Tempus(argumentFactory(newdate))), ''+new FakeDate(newdate), '[Tempus]');
    equal(''+new FakeDate(+new Tempus(argumentFactory(new FakeDate()))), ''+new FakeDate(new FakeDate()), '[Date]');

});

QUnit.test('Initialise date without "new"', function () {
    
    equal(Tempus() instanceof Tempus, true);
    equal(Number(Tempus([2011, 8])), Number(new Tempus([2011, 8])));
    equal(Number(Tempus(2011, 8)), Number(new Tempus(2011, 8)));
    equal(Number(Tempus('Sun, 11 Sep 2011 21:48:43 GMT')), Number(new Tempus('Sun, 11 Sep 2011 21:48:43 GMT')));
});

QUnit.test('Date initialise with additional tz param', function () {
    var newdate = new Tempus(2011, 8, 11, 20, 48, 43, 100, -120);
    
    equal(newdate.timezoneOffset(), -120, 'timezoneOffset is -120');
    equal(newdate.hours(), 20, 'hours');
    equal(newdate.UTCHours(), 18, 'UTCHours');
});

QUnit.module('Date parsing');

QUnit.test('Initialise with ISO8601 dates', function () {   
    var x = new Tempus('2011-09-11T20:48:43.519Z');
    equal(''+new FakeDate(Number(x)), ''+new FakeDate(1315774123519), "2011-09-11T20:48:43.519Z (" + String(x) + ")");

    x = new Tempus('2008-01-01T12:12:12.111Z');
    equal(''+new FakeDate(Number(x)), ''+new FakeDate(1199189532111), "2008-01-01T12:12:12.111Z (" + String(x) + ")");

    x = new Tempus('2024-12-31T11:59:59.999Z');
    equal(''+new FakeDate(Number(x)), ''+new FakeDate(1735646399999), "2024-12-31T11:59:59.999Z (" + String(x) + ")");

    x = new Tempus('1986-04-24T08:55:32.216+0100');
    equal(''+new FakeDate(Number(x)), ''+new FakeDate(514713332216), "1986-04-24T08:55:32.216+0100 (" + String(x) + ")");

    x = new Tempus('2008-02-28T20:33:01.519+0100');
    equal(''+new FakeDate(Number(x)), ''+new FakeDate(1204227181519), "2008-02-29T20:33:01.519+0100 (" + String(x) + ")");

    x = new Tempus('1970-01-01T00:00:00.000Z');
    equal(''+new FakeDate(Number(x)), ''+new FakeDate(0), "1970-01-01T00:00:00.000Z (" + String(x) + ")");

    x = new Tempus('2012-12-21T06:06:06.666+0800');
    equal(''+new FakeDate(Number(x)), ''+new FakeDate(1356041166666), "2012-12-21T06:06:06.666+0800 (" + String(x) + ")");
});
    
QUnit.test('Initialise with new ISO8601 intervals', function () {   
    equal(Number(new Tempus('P3D')), 1316033323519, "P3D: Wed Sep 14 2011 21:48:43 GMT+0100 (BST)");
    equal(Number(new Tempus('P1D2M')), 1321134523519, "P1D2M: Mon Nov 12 2011 21:48:43 GMT+0000 (GMT)");
    equal(Number(new Tempus('P1D2M1Y')), 1352756923519, "P1D2M1Y: Mon Nov 12 2012 21:48:43 GMT+0000 (GMT)");
    equal(Number(new Tempus('P6D4M3Y')), 1421531323519, "P6D4M3Y: Sat Jan 17 2015 21:48:43 GMT+0000 (GMT)");
    equal(Number(new Tempus('PT2H30M')), 1315783123519, "PT2H30M: Mon Sep 12 2011 00:18:43 GMT+0100 (BST)");
    equal(Number(new Tempus('PT30M')), 1315775923519, "P30M: Sun Sep 11 2011 22:18:43 GMT+0100 (BST)");
    equal(Number(new Tempus('PT2S')), 1315774125519, "P2S: Sun Sep 11 2011 21:48:45 GMT+0100 (BST)");
    equal(Number(new Tempus('P3Y6M4DT12H30M5S')), 1426501128519, "P3Y6M4DT12H30M5S: Wed Sep 14 2011 21:48:43 GMT+0100 (BST)");
    equal(Number(new Tempus('-P3D')), 1315514923519, "-P3D: Thu Sep 08 2011 21:48:43 GMT+0100 (BST)");
    equal(Number(new Tempus('-P1D2M')), 1310330923519, "-P1D2M: Sun Jul 10 2011 21:48:43 GMT+0100 (BST)");
});
    
QUnit.test('Initialize date with array of reverse formatters', function () {   
    
    var newdate = Tempus('2011-02-05', ['%d-%m-%Y', '%Y-%m-%d']);
    equal(newdate.fullYear(), 2011, String(newdate));
    equal(newdate.month(), 1, String(newdate));
    equal(newdate.date(), 5, String(newdate));

    newdate = Tempus('05-02-2011', ['%d-%m-%Y', '%Y-%m-%d']);
    equal(newdate.fullYear(), 2011, String(newdate));
    equal(newdate.month(), 1, String(newdate));
    equal(newdate.date(), 5, String(newdate));
});

QUnit.test('Bad dates in reverse formatter throws error', function () {
    
    raises(
        function () {
            Tempus('this-aint-gonna-work', '%d-%m-%Y');
        },
        /^Error: Cannot parse "this-aint-gonna-work" with "%d-%m-%Y"$/,
        'Error thrown'
    );
    
    raises(
        function () {
            Tempus('this-aint-gonna-work', ['%d-%m-%Y', '%Y-%m-%d']);
        },
        /^Error: Cannot parse "this-aint-gonna-work" with "%d-%m-%Y,%Y-%m-%d"$/,
        'Error thrown'
    );
});