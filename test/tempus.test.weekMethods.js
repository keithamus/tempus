QUnit.module('New Week Methods');

covers(Tempus.prototype, 'Tempus', 'getWeek', 'week');
QUnit.test('getWeek()/week()', function () {
    var newdate = new Tempus(2011, 0, 1);
    equal(newdate.getWeek(), 52, String(newdate));
    equal(newdate.week(), 52, String(newdate));
    
    newdate = new Tempus(2011, 0, 3);
    equal(newdate.getWeek(), 1, String(newdate));
    equal(newdate.week(), 1, String(newdate));

    newdate = new Tempus(2011, 0, 9);
    equal(newdate.getWeek(), 1, String(newdate));
    equal(newdate.week(), 1, String(newdate));
    
    newdate = new Tempus(2011, 0, 10);
    equal(newdate.getWeek(), 2, String(newdate));
    equal(newdate.week(), 2, String(newdate));
    
    newdate = new Tempus(2011, 0, 17);
    equal(newdate.getWeek(), 3, String(newdate));
    equal(newdate.week(), 3, String(newdate));
    
    newdate = new Tempus(2011, 0, 24);
    equal(newdate.getWeek(), 4, String(newdate));
    equal(newdate.week(), 4, String(newdate));
    
    newdate = new Tempus(2011, 3, 11);
    equal(newdate.getWeek(), 15, String(newdate));
    equal(newdate.week(), 15, String(newdate));
    
    newdate = new Tempus(2011, 4, 16);
    equal(newdate.getWeek(), 20, String(newdate));
    equal(newdate.week(), 20, String(newdate));
    
    newdate = new Tempus(2011, 6, 25);
    equal(newdate.getWeek(), 30, String(newdate));
    equal(newdate.week(), 30, String(newdate));
    
    newdate = new Tempus(2011, 8, 11);
    equal(newdate.getWeek(), 36, String(newdate));
    equal(newdate.week(), 36, String(newdate));
    
    newdate = new Tempus(2008, 0, 1);
    equal(newdate.getWeek(), 1, String(newdate));
    equal(newdate.week(), 1, String(newdate));
    
    newdate = new Tempus(2008, 1, 1);
    equal(newdate.getWeek(), 5, String(newdate));
    equal(newdate.week(), 5, String(newdate));
    
    newdate = new Tempus(2008, 1, 24);
    equal(newdate.getWeek(), 8, String(newdate));
    equal(newdate.week(), 8, String(newdate));
    
    newdate = new Tempus(2008, 1, 28);
    equal(newdate.getWeek(), 9, String(newdate));
    equal(newdate.week(), 9, String(newdate));
    
    newdate = new Tempus(2008, 1, 29);
    equal(newdate.getWeek(), 9, String(newdate));
    equal(newdate.week(), 9, String(newdate));
    
    newdate = new Tempus(2008, 2, 1);
    equal(newdate.getWeek(), 9, String(newdate));
    equal(newdate.week(), 9, String(newdate));
    
    newdate = new Tempus(2008, 2, 3);
    equal(newdate.getWeek(), 10, String(newdate));
    equal(newdate.week(), 10, String(newdate));
    
    newdate = new Tempus(2011, 6, 14);
    equal(newdate.getWeek(), 28, String(newdate));
    equal(newdate.week(), 28, String(newdate));
    
    newdate = new Tempus(2005, 11, 25);
    equal(newdate.getWeek(), 51, String(newdate));
    equal(newdate.week(), 51, String(newdate));
    
    newdate = new Tempus(2004, 1, 29);
    equal(newdate.getWeek(), 9, String(newdate));
    equal(newdate.week(), 9, String(newdate));
    
    newdate = new Tempus(1999, 11, 13);
    equal(newdate.getWeek(), 50, String(newdate));
    equal(newdate.week(), 50, String(newdate));
});

//covers(Tempus.prototype, 'Tempus', 'setWeek');
// test('setWeek()/week(N)', function () {
//     var newdate = new Tempus(2010, 0, 1);
//     newdate.setWeek(52);
//     equal(newdate.toDateString(), 'Mon Dec 27 2010');
//     newdate.week(52);
//     equal(newdate.toDateString(), 'Mon Dec 27 2010');
    
//     newdate = new Tempus(2011, 0, 1);
//     newdate.setWeek(1);
//     equal(newdate.toDateString(), 'Mon 3 Jan 2011');
//     newdate.week(1);
//     equal(newdate.toDateString(), 'Mon 3 Jan 2011');

//     newdate.setWeek(2);
//     equal(newdate.toDateString(), 'Mon Jan 10 2011');
//     newdate.week(2);
//     equal(newdate.toDateString(), 'Mon Jan 10 2011');

//     newdate.setWeek(3);
//     equal(newdate.toDateString(), 'Mon Jan 17 2011');
//     newdate.week(3);
//     equal(newdate.toDateString(), 'Mon Jan 17 2011');

//     newdate.setWeek(4);
//     equal(newdate.toDateString(), 'Mon Jan 24 2011');
//     newdate.week(4);
//     equal(newdate.toDateString(), 'Mon Jan 24 2011');


//     newdate.setWeek(5);
//     equal(newdate.toDateString(), 'Mon Jan 31 2011');
//     newdate.week(5);
//     equal(newdate.toDateString(), 'Mon Jan 31 2011');


//     newdate.setWeek(6);
//     equal(newdate.toDateString(), 'Mon 7 Feb 2011');
//     newdate.week(6);
//     equal(newdate.toDateString(), 'Mon 7 Feb 2011');
    
//     newdate.setWeek(15);
//     equal(newdate.toDateString(), 'Mon Mar 11 2011');
//     newdate.week(15);
//     equal(newdate.toDateString(), 'Mon Mar 11 2011');

//     newdate.setWeek(20);
//     equal(newdate.toDateString(), 'Mon Apr 16 2011');
//     newdate.week(20);
//     equal(newdate.toDateString(), 'Mon Apr 16 2011');
    
//     newdate.setWeek(30);
//     equal(newdate.toDateString(), 'Mon Jun 20 2011');
//     newdate.week(30);
//     equal(newdate.toDateString(), 'Mon Jun 20 2011');
    
//     newdate.setWeek(36);
//     equal(newdate.toDateString(), 'Mon 8 Aug 2011');
//     newdate.week(36);
//     equal(newdate.toDateString(), 'Mon 8 Aug 2011');
    
//     newdate = new Tempus(2008, 0, 5);
//     newdate.setWeek(1);
//     equal(newdate.toDateString(), 'Mon 7 Jan 2008');
//     newdate.week(1);
//     equal(newdate.toDateString(), 'Mon 7 Jan 2008');
    
//     newdate.setWeek(5);
//     equal(newdate.toDateString(), 'Mon 4 Feb 2008');
//     newdate.week(5);
//     equal(newdate.toDateString(), 'Mon 4 Feb 2008');
    
//     newdate.setWeek(7);
//     equal(newdate.toDateString(), 'Mon Feb 18 2008');
//     newdate.week(7);
//     equal(newdate.toDateString(), 'Mon Feb 18 2008');
    
//     newdate.setWeek(8);
//     equal(newdate.toDateString(), 'Mon Feb 25 2008');
//     newdate.week(8);
//     equal(newdate.toDateString(), 'Mon Feb 25 2008');
    
//     newdate.setWeek(9);
//     equal(newdate.toDateString(), 'Mon 3 Mar 2008');
//     newdate.week(9);
//     equal(newdate.toDateString(), 'Mon 3 Mar 2008');
    
//     newdate.setWeek(10);
//     equal(newdate.toDateString(), 'Mon Mar 10 2008');
//     newdate.week(10);
//     equal(newdate.toDateString(), 'Mon Mar 10 2008');
    
//     newdate = new Tempus(2011, 6, 14);
//     newdate.setWeek(28);
//     equal(newdate.toDateString(), 'Mon Feb 13 2008');
//     newdate.week(28);
//     equal(newdate.toDateString(), 'Mon Feb 13 2008');
    
//     newdate = new Tempus(2005, 11, 25);
//     newdate.setWeek(51);
//     equal(newdate.toDateString(), 'Mon Dec 19 2005');
//     newdate.week(51);
//     equal(newdate.toDateString(), 'Mon Dec 19 2005');
    
//     newdate = new Tempus(2004, 1, 29);
//     newdate.setWeek(8);
//     equal(newdate.toDateString(), 'Mon Feb 24 2004');
//     newdate.week(8);
//     equal(newdate.toDateString(), 'Mon Feb 24 2004');
    
//     newdate = new Tempus(1999, 11, 1);
//     newdate.setWeek(50);
//     equal(newdate.toDateString(), 'Mon Dec 13 1999');
//     newdate.week(50);
//     equal(newdate.toDateString(), 'Mon Dec 13 1999');
// });

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

//covers(Tempus.prototype, 'Tempus', 'eachWeekOfMonth');
//test('Test eachWeekOfMonth', function () {
//    var newdate
//    ,   c
//    ,   i = 12
//    ,   months = [1, 5, 9, 13, 17, 22, 26, 31, 35, 39, 44, 47]
//    ,   dateObj;
//    
//    expect(204);
//    
//    while(i--) {
//        newdate = new Tempus(2011, i);
//        c = 47;
//        dateObj = new Tempus(newdate);
//        newdate.eachWeekOfMonth(function (weekI, date) {
//            equal(weekI, ++c, 'First argument is week in ' + date.getMonthName());
//            equal(Number(date), Number(dateObj), 'Second argument is date obj ' + String(date));
//            ok(this instanceof Tempus, '`this` is Tempus object');
//            equal(Number(this), Number(dateObj), '`this` is date obj ' + String(date))
//        });
//    }
//    
//});