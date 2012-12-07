QUnit.module('New Time Methods');

covers(Tempus.prototype, 'Tempus', 'clearTime', 'setTimeToNow');
QUnit.test('clearTime() and setTimeToNow()', function () {
    var newdate = new Tempus(2011, 8, 11), str = (new FakeDate()).toTimeString();
    
    newdate.setTimeToNow();
    equal(newdate.toTimeString(), str, String(newdate));
    
    newdate.clearTime();
    equal(newdate.timeString(), '00:00:00', String(newdate));
});

covers(Tempus.prototype, 'Tempus', 'AMPM', 'ampm', 'getAMPM', 'getampm', 'setampm', 'setAMPM');
QUnit.test("getAMPM()/AMPM() and getampm()/ampm() and setAMPM()/setampm()/ampm(n)", function () {
    var newdate = new Tempus(2011, 8, 11, 15, 30, 0);
    
    equal(newdate.AMPM(), 'PM', newdate.toString());
    equal(newdate.getAMPM(), 'PM', newdate.toString());
    equal(newdate.ampm(), 'pm', newdate.toString());
    equal(newdate.getampm(), 'pm', newdate.toString());
    newdate.setAMPM('PM');
    equal(newdate.hours(), 15);
    equal(newdate.AMPM(), 'PM', newdate.toString());
    equal(newdate.getAMPM(), 'PM', newdate.toString());
    equal(newdate.ampm(), 'pm', newdate.toString());
    equal(newdate.getampm(), 'pm', newdate.toString());
    newdate.AMPM('PM');
    equal(newdate.hours(), 15);
    equal(newdate.AMPM(), 'PM', newdate.toString());
    equal(newdate.getAMPM(), 'PM', newdate.toString());
    equal(newdate.ampm(), 'pm', newdate.toString());
    equal(newdate.getampm(), 'pm', newdate.toString());
    newdate.ampm('pm');
    equal(newdate.hours(), 15);
    equal(newdate.AMPM(), 'PM', newdate.toString());
    equal(newdate.getAMPM(), 'PM', newdate.toString());
    equal(newdate.ampm(), 'pm', newdate.toString());
    equal(newdate.getampm(), 'pm', newdate.toString());
    newdate.AMPM('pm');
    equal(newdate.hours(), 15);
    equal(newdate.AMPM(), 'PM', newdate.toString());
    equal(newdate.getAMPM(), 'PM', newdate.toString());
    equal(newdate.ampm(), 'pm', newdate.toString());
    equal(newdate.getampm(), 'pm', newdate.toString());
    newdate.ampm('PM');
    equal(newdate.hours(), 15);
    equal(newdate.AMPM(), 'PM', newdate.toString());
    equal(newdate.getAMPM(), 'PM', newdate.toString());
    equal(newdate.ampm(), 'pm', newdate.toString());
    equal(newdate.getampm(), 'pm', newdate.toString());

    newdate.AMPM('am');
    equal(newdate.hours(), 3);
    equal(newdate.AMPM(), 'AM', newdate.toString());
    equal(newdate.getAMPM(), 'AM', newdate.toString());
    equal(newdate.ampm(), 'am', newdate.toString());
    equal(newdate.getampm(), 'am', newdate.toString());
    newdate.setAMPM('am');
    equal(newdate.hours(), 3);
    equal(newdate.AMPM(), 'AM', newdate.toString());
    equal(newdate.getAMPM(), 'AM', newdate.toString());
    equal(newdate.ampm(), 'am', newdate.toString());
    equal(newdate.getampm(), 'am', newdate.toString());
    newdate.setampm('am');
    equal(newdate.hours(), 3);
    equal(newdate.AMPM(), 'AM', newdate.toString());
    equal(newdate.getAMPM(), 'AM', newdate.toString());
    equal(newdate.ampm(), 'am', newdate.toString());
    equal(newdate.getampm(), 'am', newdate.toString());
    newdate.ampm('am');
    equal(newdate.hours(), 3);
    equal(newdate.AMPM(), 'AM', newdate.toString());
    equal(newdate.getAMPM(), 'AM', newdate.toString());
    equal(newdate.ampm(), 'am', newdate.toString());
    equal(newdate.getampm(), 'am', newdate.toString());

    newdate.setHours(9);
    equal(newdate.AMPM(), 'AM', newdate.toString());
    equal(newdate.getAMPM(), 'AM', newdate.toString());
    equal(newdate.ampm(), 'am', newdate.toString());
    equal(newdate.getampm(), 'am', newdate.toString());
});

covers(Tempus.prototype, 'Tempus', 'ordinalHours', 'setOrdinalHours', 'getOrdinalHours', 'addOrdinalHours', 'subOrdinalHours');
QUnit.test("getOrdinalHours()/ordinalHours() and setOrdinalHours()/ordinalHours(i)", function () {
    var newdate = new Tempus(2011, 8, 11, 9, 30, 00)
    ,   i;

    //expect(25);

    equal(newdate.getHours(), 9);
    equal(newdate.getOrdinalHours(), 9);
    equal(newdate.ordinalHours(), 9);
    equal(newdate.AMPM(), 'AM');

    for (i = 1; i < 12; ++i) {
        newdate.setOrdinalHours(i);
        equal(newdate.getHours(), i, 'setOrdinalHours(' + i + ') - getHours()');
        equal(newdate.getOrdinalHours(), i, 'setOrdinalHours(' + i + ') - getOrdinalHours()');
        equal(newdate.ordinalHours(), i, 'setOrdinalHours(' + i + ') - ordinalHours()');

        newdate.ordinalHours(i);
        equal(newdate.getHours(), i, 'ordinalHours(' + i + ') - getHours()');
        equal(newdate.getOrdinalHours(), i, 'ordinalHours(' + i + ') - getOrdinalHours()');
        equal(newdate.ordinalHours(), i, 'ordinalHours(' + i + ') - ordinalHours()');
    }

    newdate.ordinalHours(5);
    equal(newdate.getHours(), 5);
    newdate.addOrdinalHours(5);
    equal(newdate.getHours(), 10);
    newdate.addOrdinalHours();
    equal(newdate.getHours(), 11);
    newdate.subOrdinalHours();
    equal(newdate.getHours(), 10);
    newdate.subOrdinalHours(6);
    equal(newdate.getHours(), 4);

    newdate.setHours(13);
    equal(newdate.AMPM(), 'PM');

    for (i = 1; i < 12; ++i) {
        newdate.setOrdinalHours(i);
        equal(newdate.getHours(), i + 12, 'setOrdinalHours(' + i + ') - getHours()');
        equal(newdate.getOrdinalHours(), i, 'setOrdinalHours(' + i + ') - getOrdinalHours()');
        equal(newdate.ordinalHours(), i, 'setOrdinalHours(' + i + ') - ordinalHours()');

        newdate.ordinalHours(i);
        equal(newdate.getHours(), i + 12, 'ordinalHours(' + i + ') - getHours()');
        equal(newdate.getOrdinalHours(), i, 'ordinalHours(' + i + ') - getOrdinalHours()');
        equal(newdate.ordinalHours(), i, 'ordinalHours(' + i + ') - ordinalHours()');
    }

    newdate.ordinalHours(5);
    equal(newdate.getHours(), 17);
    newdate.addOrdinalHours(5);
    equal(newdate.getHours(), 22);
    newdate.addOrdinalHours();
    equal(newdate.getHours(), 23);
    newdate.subOrdinalHours();
    equal(newdate.getHours(), 22);
    newdate.subOrdinalHours(6);
    equal(newdate.getHours(), 16);

});

covers(Tempus.prototype, 'Tempus', 'microSeconds', 'getMicroSeconds', 'setMicroSeconds', 'subMicroSeconds', 'addMicroSeconds');
QUnit.test("getMicroSeconds()/microSeconds() and setMicroSeconds()/microSeconds(i)", function () {
    
    var newdate = new Tempus(2011, 8, 11, 9, 30, 0);

    newdate.setMilliseconds(519);
    equal(newdate.microSeconds(), 519000);
    equal(newdate.getMicroSeconds(), 519000);

    newdate.setMicroSeconds(603000);
    equal(newdate.getMilliseconds(), 603);
    equal(newdate.microSeconds(), 603000);
    equal(newdate.getMicroSeconds(), 603000);

    newdate.subMicroSeconds(3000);
    equal(newdate.getMilliseconds(), 600);
    equal(newdate.microSeconds(), 600000);
    equal(newdate.getMicroSeconds(), 600000);

    newdate.addMicroSeconds(12000);
    equal(newdate.getMilliseconds(), 612);
    equal(newdate.microSeconds(), 612000);
    equal(newdate.getMicroSeconds(), 612000);
});

covers(Tempus.prototype, 'Tempus', 'UTCMicroSeconds', 'getUTCMicroSeconds', 'setUTCMicroSeconds', 'subUTCMicroSeconds', 'addUTCMicroSeconds');
QUnit.test("getUTCMicroSeconds()/UTCMicroSeconds() and setUTCMicroSeconds()/UTCMicroSeconds(i)", function () {
    
    var newdate = new Tempus(2011, 8, 11, 9, 30, 0);

    newdate.setMilliseconds(519);
    equal(newdate.UTCMicroSeconds(), 519000);
    equal(newdate.getUTCMicroSeconds(), 519000);

    newdate.setUTCMicroSeconds(603000);
    equal(newdate.getMilliseconds(), 603);
    equal(newdate.UTCMicroSeconds(), 603000);
    equal(newdate.getUTCMicroSeconds(), 603000);

    newdate.subUTCMicroSeconds(3000);
    equal(newdate.getMilliseconds(), 600);
    equal(newdate.UTCMicroSeconds(), 600000);
    equal(newdate.getUTCMicroSeconds(), 600000);

    newdate.addUTCMicroSeconds(12000);
    equal(newdate.getMilliseconds(), 612);
    equal(newdate.UTCMicroSeconds(), 612000);
    equal(newdate.getUTCMicroSeconds(), 612000);
});

covers(Tempus.prototype, 'Tempus', 'timeString');
QUnit.test("timeString() and timeSring(n)", function () {
    
    var newdate = new Tempus(2011, 8, 11, 9, 30, 0);

    equal(newdate.timeString(), '09:30:00', String(newdate));

    newdate = new Tempus(2011, 8, 11, 13, 24, 17);

    equal(newdate.timeString(), '13:24:17', String(newdate));

    newdate.timeString('07:18:29');
    equal(newdate.timeString(), '07:18:29', String(newdate));
    equal(newdate.hours(), 7, String(newdate));
    equal(newdate.minutes(), 18, String(newdate));
    equal(newdate.seconds(), 29, String(newdate));

    newdate.timeString('07:18');
    equal(newdate.timeString(), '07:18:00', String(newdate));
    newdate.timeString('07');
    equal(newdate.timeString(), '07:00:00', String(newdate));

});

covers(Tempus.prototype, 'Tempus', 'secondFraction', 'getSecondFraction', 'setSecondFraction',
    'UTCSecondFraction', 'getUTCSecondFraction', 'setUTCSecondFraction', 'addSecondFraction',
    'subSecondFraction', 'addUTCSecondFraction', 'subUTCSecondFraction');
QUnit.test("secondFraction() and secondFraction(n)", function () {
    
    var newdate = new Tempus(2011, 8, 11, 9, 30, 0);

    newdate.secondFraction(6123450000000);

    equal(newdate.secondFraction(), 612, 'secondFraction always returns MS');

    newdate.secondFraction(61);

    equal(newdate.secondFraction(), 610, 'secondFraction always returns MS');

    newdate.setSecondFraction(3);

    equal(newdate.getSecondFraction(), 300, 'secondFraction always returns MS');

    newdate.setSecondFraction('00003');

    equal(newdate.getSecondFraction(), 0, 'secondFraction always returns MS');

    newdate.addSecondFraction(300);

    equal(newdate.getSecondFraction(), 300, 'addSecondFraction(300)');

    newdate.subSecondFraction('050');

    equal(newdate.getSecondFraction(), 250, 'addSecondFraction(300)');

    newdate.UTCSecondFraction(6123450000000);

    equal(newdate.UTCSecondFraction(), 612, 'UTCSecondFraction always returns MS');

    newdate.UTCSecondFraction(61);

    equal(newdate.UTCSecondFraction(), 610, 'UTCSecondFraction always returns MS');

    newdate.setUTCSecondFraction(3);

    equal(newdate.getUTCSecondFraction(), 300, 'UTCSecondFraction always returns MS');

    newdate.setUTCSecondFraction('00003');

    equal(newdate.getUTCSecondFraction(), 0, 'UTCSecondFraction always returns MS');

    newdate.addUTCSecondFraction(300);

    equal(newdate.getUTCSecondFraction(), 300, 'addUTCSecondFraction(300)');

    newdate.subUTCSecondFraction('050');

    equal(newdate.getUTCSecondFraction(), 250, 'addUTCSecondFraction(300)');
});