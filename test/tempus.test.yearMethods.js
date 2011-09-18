QUnit.module('New Year Methods');

covers(Tempus.prototype, 'Tempus', 'isLeapYear');
QUnit.test('isLeapYear()', function () {
    var newdate = new Tempus(1325397600000); // 2012 is a leap year
    strictEqual(newdate.isLeapYear(), true, String(newdate));
    
    newdate = new Tempus(1293861600000); // 2011 not a leap year
    strictEqual(newdate.isLeapYear(), false, String(newdate));
    
    newdate = new Tempus(1262325600000); // 2010 not a leap year
    strictEqual(newdate.isLeapYear(), false, String(newdate));
    
    newdate = new Tempus(1230789600000); // 2009 not a leap year
    strictEqual(newdate.isLeapYear(), false, String(newdate));
    
    newdate = new Tempus(1199167200000); // 2008 is a leap year
    strictEqual(newdate.isLeapYear(), true, String(newdate));
});

covers(Tempus.prototype, 'Tempus', 'getYear', 'year');
QUnit.test('getYear()/year() (the proper one)', function () {
    var newdate = new Tempus(1325397600000)
    ,   dateObj = new Date(1325397600000);


    equal(dateObj.getFullYear(), 2012, String(newdate));
    equal(newdate.year(), 12, String(newdate));
    equal(newdate.getYear(), 12, String(newdate));
    
    newdate = new Tempus(1199167200000);
    dateObj = new Date(1199167200000);
    equal(dateObj.getFullYear(), 2008, String(newdate));
    equal(newdate.year(), 8, String(newdate));
    equal(newdate.year(), 8, String(newdate));
    equal(newdate.getYear(), 8, String(newdate));
    
    newdate = new Tempus(631173600000);
    dateObj = new Date(631173600000);
    equal(dateObj.getFullYear(), 1990, String(newdate));
    equal(newdate.year(), 90, String(newdate));
    equal(newdate.getYear(), 90, String(newdate));
    
    newdate = new Tempus(946706400000);
    dateObj = new Date(946706400000);
    equal(dateObj.getFullYear(), 2000, String(newdate));
    equal(newdate.year(), 0, String(newdate));
    equal(newdate.getYear(), 0, String(newdate));
    
    newdate = new Tempus(0);
    dateObj = new Date(0);
    equal(dateObj.getFullYear(), 1970, String(newdate));
    equal(newdate.year(), 70, String(newdate));
    equal(newdate.getYear(), 70, String(newdate));
});

covers(Tempus.prototype, 'Tempus', 'setYear', 'addYear', 'subYear');
QUnit.test('setYear()/year(N) (the proper one)', function () {
    var newdate = new Tempus();
    newdate.setYear(12);
    equal(newdate.getFullYear(), 2012, String(newdate));
    
    newdate.year(11);
    equal(newdate.getFullYear(), 2011, String(newdate));

    newdate.addYear(1);
    equal(newdate.getFullYear(), 2012, String(newdate));

    newdate.addYear(15);
    equal(newdate.getFullYear(), 2027, String(newdate));

    newdate.subYear(10);
    equal(newdate.getFullYear(), 2017, String(newdate));
    
    newdate.year(99);
    equal(newdate.getFullYear(), 2099, String(newdate));

    newdate.subYear(90);
    equal(newdate.getFullYear(), 2009, String(newdate));
    
    newdate.year(100);
    equal(newdate.getFullYear(), 2010, String(newdate));

    newdate.addYear(2);
    equal(newdate.getFullYear(), 2012, String(newdate));
});

covers(Tempus.prototype, 'Tempus', 'UTCYear', 'getUTCYear', 'setUTCYear', 'addUTCYear', 'subUTCYear');
QUnit.test('setUTCYear()/UTCYear(N) and getUTCYear()/UTCYear() and subUTCYear() and addUTCYear()', function () {
    var newdate = new Tempus();
    newdate.setUTCYear(12);
    equal(newdate.getUTCYear(), 12, String(newdate));
    equal(newdate.UTCYear(), 12, String(newdate));
    
    newdate.addUTCYear(3);
    equal(newdate.getUTCYear(), 15, String(newdate));
    equal(newdate.UTCYear(), 15, String(newdate));

    newdate.subUTCYear(2);
    equal(newdate.getUTCYear(), 13, String(newdate));
    equal(newdate.UTCYear(), 13, String(newdate));

    newdate.subUTCYear(1);
    equal(newdate.getUTCYear(), 12, String(newdate));
    equal(newdate.UTCYear(), 12, String(newdate));
});

covers(Tempus.prototype, 'Tempus', 'century', 'getCentury', 'setCentury');
QUnit.test('getCentury()/century() and setCentury()/century(N)', function () {
    var newdate = new Tempus();
    
    newdate.setFullYear(2012);
    equal(newdate.getCentury(), 21, String(newdate));
    newdate.setCentury(20);
    equal(newdate.century(), 20, String(newdate));
    equal(newdate.fullYear(), 1912, String(newdate));

    newdate.setFullYear(1999);
    equal(newdate.getCentury(), 20, String(newdate));
    newdate.setCentury(21);
    equal(newdate.century(), 21, String(newdate));
    equal(newdate.fullYear(), 2099, String(newdate));

    newdate.setFullYear(1900);
    equal(newdate.getCentury(), 20, String(newdate));
    newdate.setCentury(19);
    equal(newdate.century(), 19, String(newdate));
    equal(newdate.fullYear(), 1800, String(newdate));

    newdate.setFullYear(1899);
    equal(newdate.getCentury(), 19, String(newdate));
    newdate.setCentury(20);
    equal(newdate.century(), 20, String(newdate));
    equal(newdate.fullYear(), 1999, String(newdate));

    newdate.setFullYear(1799);
    equal(newdate.getCentury(), 18, String(newdate));
    newdate.setCentury(17);
    equal(newdate.century(), 17, String(newdate));
    equal(newdate.fullYear(), 1699, String(newdate));

    newdate.setFullYear(3000);
    equal(newdate.getCentury(), 31, String(newdate));
    newdate.setCentury(21);
    equal(newdate.century(), 21, String(newdate));
    equal(newdate.fullYear(), 2000, String(newdate));
});

covers(Tempus.prototype, 'Tempus', 'subCentury', 'addCentury');
QUnit.test('addCentury() and subCentury()', function () {
    var newdate = new Tempus();
    
    newdate.setFullYear(2012);
    newdate.subCentury();
    equal(newdate.getCentury(), 20, String(newdate));

    newdate.subCentury(2);
    equal(newdate.getCentury(), 18, String(newdate));

    newdate.addCentury(10);
    equal(newdate.getCentury(), 28, String(newdate));

    newdate.addCentury(10);
    equal(newdate.getCentury(), 38, String(newdate));
});