QUnit.module('New Week Methods');

covers(Tempus.prototype, 'Tempus', 'getWeek', 'week');
QUnit.test('getWeek()/week()', function () {
	
	var newdate = new Tempus(2012, 1, 13);
	equal(newdate.getWeek(), 7, String(newdate));
    equal(newdate.week(), 7, String(newdate));
    equal(newdate.week(7).week(), 7, 'week should be idempotent (' + String(newdate) + ')');
	
    newdate = new Tempus(2011, 0, 1);
    equal(newdate.getWeek(), 52, String(newdate));
    equal(newdate.week(), 52, String(newdate));
    equal(newdate.week(52).week(), 52, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2011, 0, 3);
    equal(newdate.getWeek(), 1, String(newdate));
    equal(newdate.week(), 1, String(newdate));
    equal(newdate.week(1).week(), 1, 'week should be idempotent (' + String(newdate) + ')');

    newdate = new Tempus(2011, 0, 9);
    equal(newdate.getWeek(), 1, String(newdate));
    equal(newdate.week(), 1, String(newdate));
    equal(newdate.week(1).week(), 1, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2011, 0, 10);
    equal(newdate.getWeek(), 2, String(newdate));
    equal(newdate.week(), 2, String(newdate));
    equal(newdate.week(2).week(), 2, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2011, 0, 17);
    equal(newdate.getWeek(), 3, String(newdate));
    equal(newdate.week(), 3, String(newdate));
    equal(newdate.week(3).week(), 3, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2011, 0, 24);
    equal(newdate.getWeek(), 4, String(newdate));
    equal(newdate.week(), 4, String(newdate));
    equal(newdate.week(4).week(), 4, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2011, 3, 11);
    equal(newdate.getWeek(), 15, String(newdate));
    equal(newdate.week(), 15, String(newdate));
    equal(newdate.week(15).week(), 15, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2011, 4, 16);
    equal(newdate.getWeek(), 20, String(newdate));
    equal(newdate.week(), 20, String(newdate));
    equal(newdate.week(20).week(), 20, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2011, 6, 25);
    equal(newdate.getWeek(), 30, String(newdate));
    equal(newdate.week(), 30, String(newdate));
    equal(newdate.week(30).week(), 30, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2011, 8, 11);
    equal(newdate.getWeek(), 36, String(newdate));
    equal(newdate.week(), 36, String(newdate));
    equal(newdate.week(36).week(), 36, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2008, 0, 1);
    equal(newdate.getWeek(), 1, String(newdate));
    equal(newdate.week(), 1, String(newdate));
    equal(newdate.week(1).week(), 1, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2008, 1, 1);
    equal(newdate.getWeek(), 5, String(newdate));
    equal(newdate.week(), 5, String(newdate));
    equal(newdate.week(5).week(), 5, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2008, 1, 24);
    equal(newdate.getWeek(), 8, String(newdate));
    equal(newdate.week(), 8, String(newdate));
    equal(newdate.week(8).week(), 8, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2008, 1, 28);
    equal(newdate.getWeek(), 9, String(newdate));
    equal(newdate.week(), 9, String(newdate));
    equal(newdate.week(9).week(), 9, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2008, 1, 29);
    equal(newdate.getWeek(), 9, String(newdate));
    equal(newdate.week(), 9, String(newdate));
    equal(newdate.week(9).week(), 9, 'week should be idempotent (' + String(newdate) + ')');

    newdate = new Tempus(2008, 2, 1);
    equal(newdate.getWeek(), 9, String(newdate));
    equal(newdate.week(), 9, String(newdate));
    equal(newdate.week(9).week(), 9, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2008, 2, 3);
    equal(newdate.getWeek(), 10, String(newdate));
    equal(newdate.week(), 10, String(newdate));
    equal(newdate.week(10).week(), 10, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2011, 6, 14);
    equal(newdate.getWeek(), 28, String(newdate));
    equal(newdate.week(), 28, String(newdate));
    equal(newdate.week(28).week(), 28, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2005, 11, 25);
    equal(newdate.getWeek(), 51, String(newdate));
    equal(newdate.week(), 51, String(newdate));
    equal(newdate.week(51).week(), 51, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(2004, 1, 29);
    equal(newdate.getWeek(), 9, String(newdate));
    equal(newdate.week(), 9, String(newdate));
    equal(newdate.week(9).week(), 9, 'week should be idempotent (' + String(newdate) + ')');
    
    newdate = new Tempus(1999, 11, 13);
    equal(newdate.getWeek(), 50, String(newdate));
    equal(newdate.week(), 50, String(newdate));
    equal(newdate.week(50).week(), 50, 'week should be idempotent (' + String(newdate) + ')');
});

covers(Tempus.prototype, 'Tempus', 'setWeek', 'addWeek', 'subWeek');
QUnit.test('setWeek()/week(N)', function () {
    var newdate = new Tempus(2010, 0, 1);
    newdate.setWeek(52);
    equal(newdate.toISODateString(), '2010-12-30', String(newdate));
    equal(newdate.week(), 52, String(newdate));
    newdate.week(52);
    equal(newdate.toISODateString(), '2010-12-30', String(newdate));
    equal(newdate.week(), 52, String(newdate));
    
    newdate = new Tempus(2011, 0, 1);
    newdate.setWeek(1);
    equal(newdate.toISODateString(), '2011-01-06', String(newdate));
    equal(newdate.week(), 1, String(newdate));
    newdate.week(1);
    equal(newdate.toISODateString(), '2011-01-06', String(newdate));
    equal(newdate.week(), 1, String(newdate));

    newdate = new Tempus(2011, 0, 3);
    newdate.addWeek();
    equal(newdate.toISODateString(), '2011-01-13', String(newdate));
    equal(newdate.week(), 2, String(newdate));
    newdate.subWeek();
    equal(newdate.toISODateString(), '2011-01-06', String(newdate));
    equal(newdate.week(), 1, String(newdate));

    newdate.setWeek(2);
    equal(newdate.toISODateString(), '2011-01-13', String(newdate));
    equal(newdate.week(), 2, String(newdate));
    newdate.week(2);
    equal(newdate.toISODateString(), '2011-01-13', String(newdate));
    equal(newdate.week(), 2, String(newdate));

    newdate.setWeek(3);
    equal(newdate.toISODateString(), '2011-01-20', String(newdate));
    equal(newdate.week(), 3, String(newdate));
    newdate.week(3);
    equal(newdate.toISODateString(), '2011-01-20', String(newdate));
    equal(newdate.week(), 3, String(newdate));

    newdate.setWeek(4);
    equal(newdate.toISODateString(), '2011-01-27', String(newdate));
    equal(newdate.week(), 4, String(newdate));
    newdate.week(4);
    equal(newdate.toISODateString(), '2011-01-27', String(newdate));
    equal(newdate.week(), 4, String(newdate));

    newdate.setWeek(5);
    equal(newdate.toISODateString(), '2011-02-03', String(newdate));
    equal(newdate.week(), 5, String(newdate));
    newdate.week(5);
    equal(newdate.toISODateString(), '2011-02-03', String(newdate));
    equal(newdate.week(), 5, String(newdate));

    newdate.setWeek(6);
    equal(newdate.toISODateString(), '2011-02-10', String(newdate));
    equal(newdate.week(), 6, String(newdate));
    newdate.week(6);
    equal(newdate.toISODateString(), '2011-02-10', String(newdate));
    equal(newdate.week(), 6, String(newdate));
    
    newdate.setWeek(15);
    equal(newdate.toISODateString(), '2011-04-14', String(newdate));
    equal(newdate.week(), 15, String(newdate));
    newdate.week(15);
    equal(newdate.toISODateString(), '2011-04-14', String(newdate));
    equal(newdate.week(), 15, String(newdate));

    newdate.setWeek(20);
    equal(newdate.toISODateString(), '2011-05-19', String(newdate));
    equal(newdate.week(), 20, String(newdate));
    newdate.week(20);
    equal(newdate.toISODateString(), '2011-05-19', String(newdate));
    equal(newdate.week(), 20, String(newdate));
    
    newdate.setWeek(30);
    equal(newdate.toISODateString(), '2011-07-28', String(newdate));
    equal(newdate.week(), 30, String(newdate));
    newdate.week(30);
    equal(newdate.toISODateString(), '2011-07-28', String(newdate));
    equal(newdate.week(), 30, String(newdate));
    
    newdate.setWeek(36);
    equal(newdate.toISODateString(), '2011-09-08', String(newdate));
    equal(newdate.week(), 36, String(newdate));
    newdate.week(36);
    equal(newdate.toISODateString(), '2011-09-08', String(newdate));
    equal(newdate.week(), 36, String(newdate));
    
    newdate = new Tempus(2008, 0, 5);
    newdate.setWeek(1);
    equal(newdate.toISODateString(), '2008-01-03', String(newdate));
    equal(newdate.week(), 1, String(newdate));
    newdate.week(1);
    equal(newdate.toISODateString(), '2008-01-03', String(newdate));
    equal(newdate.week(), 1, String(newdate));
    
    newdate.setWeek(5);
    equal(newdate.toISODateString(), '2008-01-31', String(newdate));
    equal(newdate.week(), 5, String(newdate));
    newdate.week(5);
    equal(newdate.toISODateString(), '2008-01-31', String(newdate));
    equal(newdate.week(), 5, String(newdate));
    
    newdate.setWeek(7);
    equal(newdate.toISODateString(), '2008-02-14', String(newdate));
    equal(newdate.week(), 7, String(newdate));
    newdate.week(7);
    equal(newdate.toISODateString(), '2008-02-14', String(newdate));
    equal(newdate.week(), 7, String(newdate));
    
    newdate.setWeek(8);
    equal(newdate.toISODateString(), '2008-02-21', String(newdate));
    equal(newdate.week(), 8, String(newdate));
    newdate.week(8);
    equal(newdate.toISODateString(), '2008-02-21', String(newdate));
    equal(newdate.week(), 8, String(newdate));
    
    newdate.setWeek(9);
    equal(newdate.toISODateString(), '2008-02-28', String(newdate));
    equal(newdate.week(), 9, String(newdate));
    newdate.week(9);
    equal(newdate.toISODateString(), '2008-02-28', String(newdate));
    equal(newdate.week(), 9, String(newdate));
    
    newdate.setWeek(10);
    equal(newdate.toISODateString(), '2008-03-06', String(newdate));
    equal(newdate.week(), 10, String(newdate));
    newdate.week(10);
    equal(newdate.toISODateString(), '2008-03-06', String(newdate));
    equal(newdate.week(), 10, String(newdate));
    
    newdate = new Tempus(2011, 6, 14);
    newdate.setWeek(28);
    equal(newdate.toISODateString(), '2011-07-14', String(newdate));
    equal(newdate.week(), 28, String(newdate));
    newdate.week(28);
    equal(newdate.toISODateString(), '2011-07-14', String(newdate));
    equal(newdate.week(), 28, String(newdate));
    
    newdate = new Tempus(2005, 11, 25);
    newdate.setWeek(51);
    equal(newdate.toISODateString(), '2005-12-22', String(newdate));
    equal(newdate.week(), 51, String(newdate));
    newdate.week(51);
    equal(newdate.toISODateString(), '2005-12-22', String(newdate));
    equal(newdate.week(), 51, String(newdate));
    
    newdate = new Tempus(2004, 1, 29);
    newdate.setWeek(8);
    equal(newdate.toISODateString(), '2004-02-19', String(newdate));
    equal(newdate.week(), 8, String(newdate));
    newdate.week(8);
    equal(newdate.toISODateString(), '2004-02-19', String(newdate));
    equal(newdate.week(), 8, String(newdate));
    
    newdate = new Tempus(1999, 11, 1);
    newdate.setWeek(50);
    equal(newdate.toISODateString(), '1999-12-16', String(newdate));
    equal(newdate.week(), 50, String(newdate));
    newdate.week(50);
    equal(newdate.toISODateString(), '1999-12-16', String(newdate));
    equal(newdate.week(), 50, String(newdate));
});

covers(Tempus.prototype, 'Tempus', 'getWeekOrdinal');
QUnit.test('getWeekOrdinal()', function () {
    var newdate = new Tempus(2011, 0, 1);
    equal(newdate.getWeekOrdinal(), 'nd', String(newdate));
    
    newdate = new Tempus(2011, 0, 3);
    equal(newdate.getWeekOrdinal(), 'st', String(newdate));

    newdate = new Tempus(2011, 0, 10);
    equal(newdate.getWeekOrdinal(), 'nd', String(newdate));
    
    newdate = new Tempus(2011, 0, 17);
    equal(newdate.getWeekOrdinal(), 'rd', String(newdate));
    
    newdate = new Tempus(2011, 0, 24);
    equal(newdate.getWeekOrdinal(), 'th', String(newdate));
    
    newdate = new Tempus(2011, 3, 11);
    equal(newdate.getWeekOrdinal(), 'th', String(newdate));
    
    newdate = new Tempus(2011, 4, 16);
    equal(newdate.getWeekOrdinal(), 'th', String(newdate));
    
    newdate = new Tempus(2011, 6, 25);
    equal(newdate.getWeekOrdinal(), 'th', String(newdate));
    
    newdate = new Tempus(2008, 2, 3);
    equal(newdate.getWeekOrdinal(), 'th', String(newdate));
    
    newdate = new Tempus(2005, 11, 25);
    equal(newdate.getWeekOrdinal(), 'st', String(newdate));
    
    newdate = new Tempus(1999, 11, 13);
    equal(newdate.getWeekOrdinal(), 'th', String(newdate));
});

covers(Tempus.prototype, 'Tempus', 'eachWeekOfMonth');
QUnit.test('Test eachWeekOfMonth', function () {
    var newdate
    ,   weekCount
    ,   dayNums
    ,   thursdaysI
    ,   i = -1
    ,   months = [0, 4, 8, 12, 16, 21, 25, 30, 34, 38, 43, 47]
    ,   thursdays = [[2, 9, 16, 23, 30],
                    [3, 10, 17, 24, 3],
                    [3, 10, 17, 24, 31],
                    [31, 7, 14, 21, 28],
                    [28, 5, 12, 19, 26, 2],
                    [2, 9, 16, 23, 30],
                    [30, 7, 14, 21, 28],
                    [4, 11, 18, 25, 1],
                    [1, 8, 15, 22, 29],
                    [29, 6, 13, 20, 27, 3],
                    [3, 10, 17, 24, 1],
                    [1, 8, 15, 22, 29]]
    ,   dateObj;

    expect(228);

    while(i++ < 12) {
        newdate = new Tempus(2011, i);
        weekCount = months[newdate.month()];
        dayNums = thursdays[newdate.month()];
        thursdaysI = 0;
        newdate.eachWeekOfMonth(function (weekI, date) {
           equal(weekI, ++weekCount, 'First argument is week ' + weekI + ' in ' + newdate.getMonthName());
           equal(date instanceof Tempus, true, 'Second argument is Tempus object: ' + date.toString());
           equal(date.date(), dayNums[thursdaysI], 'Second argument has date set to the current iterations thursday (' + dayNums[thursdaysI] + '): ' + String(date));
           equal(this === newdate, true, '`this` is fixed to the original date: ' + String(date));
           thursdaysI++;
        });
    }
   
});

covers(Tempus.prototype, 'Tempus', 'eachWeekOfYear');
QUnit.test('Test eachWeekOfYear', function () {
    var newdate
    ,   i = 0
    ,   thursdays = [6, 13, 20, 27, 3, 10, 17, 24, 3, 10, 17, 24, 31, 7, 14, 21, 28, 5, 12, 19, 
                    26, 2, 9, 16, 23, 30, 7, 14, 21, 28, 4, 11, 18, 25, 1, 8, 15, 22, 29, 6, 13,
                    20, 27, 3, 10, 17, 24, 1, 8, 15, 22, 29, 5]
    ,   dateObj;

    expect(212);

    newdate = new Tempus(2011, 0);
    dateObj = new Date(+newdate);

    newdate.eachWeekOfYear(function (weekI, date) {
       equal(weekI, i+1 > 52 ? 53 - i : i+1, 'First argument is week in year ' + newdate.getMonthName());
       equal(date instanceof Tempus, true, 'Second argument is Tempus object');
       equal(date.date(), thursdays[i++], 'Second argument has date set to the current iterations thursday ('+thursdays[i]+'): ' + String(date));
       equal(this === newdate, true, '`this` is fixed to the original date: ' + String(date));
    });

});