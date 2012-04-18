QUnit.module('Timers');

covers(Tempus.Timer.prototype, 'Timer', 'constructor');
QUnit.test("new Timer()", function () {
    
    var fn = function () {}
    ,   timer = new Tempus.Timer();

    ok(timer instanceof Tempus.Timer, 'Timer is chainable');
    ok(timer.context, 'Timer has a context');
    ok(timer.hasOwnProperty('isInterval'), 'Timer has `isInterval` property');
    equal(timer.runCount, 0, 'Timer has runCount of 0');
    equal(timer.fn, undefined, 'Timer does not have a function');
    equal(timer.ms, undefined, 'Timer does not have a time');

    timer = new Tempus.Timer(fn);

    ok(timer instanceof Tempus.Timer, 'Timer is chainable');
    ok(timer.context, 'Timer has a context');
    ok(timer.hasOwnProperty('isInterval'), 'Timer has `isInterval` property');
    equal(timer.runCount, 0, 'Timer has runCount of 0');
    equal(timer.fn, fn, 'Timer has a function');
    equal(timer.ms, undefined, 'Timer does not have a time');

    timer = new Tempus.Timer(fn, 300);

    ok(timer instanceof Tempus.Timer, 'Timer is chainable');
    ok(timer.context, 'Timer has a context');
    ok(timer.hasOwnProperty('isInterval'), 'Timer has `isInterval` property');
    equal(timer.runCount, 0, 'Timer has runCount of 0');
    equal(timer.fn, fn, 'Timer has a function');
    equal(timer.ms, 300, 'Timer is set to 300ms');


    timer = new Tempus.Timer(fn, 250, { myobject: true });

    ok(timer instanceof Tempus.Timer, 'Timer is chainable');
    ok(timer.context, 'Timer has a context');
    ok(timer.hasOwnProperty('isInterval'), 'Timer has `isInterval` property');
    equal(timer.runCount, 0, 'Timer has runCount of 0');
    equal(timer.fn, fn, 'Timer has a function');
    equal(timer.ms, 250, 'Timer is set to 250ms');
    deepEqual(timer.ctx, { myobject: true }, "Context has been set");

});

QUnit.test("Timer() as a factory method", function () {
    
    var fn = function () {}
    ,   timer = Tempus.Timer();

    ok(timer instanceof Tempus.Timer, 'Timer is chainable');
    ok(timer.context, 'Timer has a context');
    ok(timer.hasOwnProperty('isInterval'), 'Timer has `isInterval` property');
    equal(timer.runCount, 0, 'Timer has runCount of 0');
    equal(timer.fn, undefined, 'Timer does not have a function');
    equal(timer.ms, undefined, 'Timer does not have a time');

    timer = Tempus.Timer(fn);

    ok(timer instanceof Tempus.Timer, 'Timer is chainable');
    ok(timer.context, 'Timer has a context');
    ok(timer.hasOwnProperty('isInterval'), 'Timer has `isInterval` property');
    equal(timer.runCount, 0, 'Timer has runCount of 0');
    equal(timer.fn, fn, 'Timer has a function');
    equal(timer.ms, undefined, 'Timer does not have a time');

    timer = Tempus.Timer(fn, 300);

    ok(timer instanceof Tempus.Timer, 'Timer is chainable');
    ok(timer.context, 'Timer has a context');
    ok(timer.hasOwnProperty('isInterval'), 'Timer has `isInterval` property');
    equal(timer.runCount, 0, 'Timer has runCount of 0');
    equal(timer.fn, fn, 'Timer has a function');
    equal(timer.ms, 300, 'Timer does not have a time');

});

QUnit.test("Timer.* functions are chainable", function () {

    var methods = {
            'run': function () {},
            'on': 0,
            'after': 0,
            'every': 0,
            'start': null,
            'exec': null,
            'stop': null
        },
        timer = Tempus.Timer();

    expect(methods.length);

    for(var i in methods) {
        ok(timer[i](methods[i]) === timer, 'Method ' + i + ' returns timer');
    }

});

covers(Tempus.Timer.prototype, 'Timer', 'run');
QUnit.test("run()", function () {

    var fnOne = function () {}
    ,   fnTwo = function () {};
    
    var timer = Tempus.Timer().run(fnOne);
    equal(timer.fn === fnOne, true, "timer.fnis fnOne");

    timer.run(fnTwo);
    equal(timer.fn === fnTwo, true, "timer.fnis fnTwo");

});

covers(Tempus.Timer.prototype, 'Timer', 'context');
QUnit.test("context()", function () {
    var timer = new Tempus.Timer()
    ,   context = { my: 'context' };

    equal(timer.ctx === timer, true, 'Context should default to the Tempus.Timer instance');

    timer.context(context);
    deepEqual(timer.ctx, context);
});

covers(Tempus.Timer.prototype, 'Timer', 'exec');
QUnit.test("exec()", function () {

    var callCount = 0,
        fn = function () { callCount++; };
    
    var timer = Tempus.Timer(fn);
    equal(timer.runCount, 0);

    timer.exec();
    equal(callCount, 1);
    equal(timer.runCount, 1);

    timer.exec();
    equal(callCount, 2);
    equal(timer.runCount, 2);

    timer.exec();
    equal(callCount, 3);
    equal(timer.runCount, 3);

});

covers(Tempus.Timer.prototype, 'Timer', 'after');
QUnit.test("after()", function () {

    var timer = Tempus.Timer().after(20);
    equal(timer.ms, 20);

    timer.start();
    equal(timer.timer.timerCalled, 'setTimeout', "setTimeout called");
    equal(timer.timer.time, 20, "setTimeout called with 20");

    timer.after(1000);
    equal(timer.ms, 1000);
    timer.start();
    equal(timer.timer.timerCalled, 'setTimeout', "setTimeout called");
    equal(timer.timer.time, 1000, "setTimeout called with 1000");

});

covers(Tempus.Timer.prototype, 'Timer', 'every');
QUnit.test("every()", function () {

    var timer = Tempus.Timer().every(20);
    equal(timer.ms, 20);
    equal(timer.interval, true, "It is an interval");

    timer.start();
    equal(timer.timer.timerCalled, 'setInterval', "setInterval called");
    equal(timer.timer.time, 20, "setInterval called with 20");
    equal(timer.interval, true, "It is an interval");

    timer.every(1000);
    equal(timer.ms, 1000);
    timer.start();
    equal(timer.timer.timerCalled, 'setInterval', "setInterval called");
    equal(timer.timer.time, 1000, "setInterval called with 1000");
    equal(timer.interval, true, "It is an interval");

});

covers(Tempus.Timer.prototype, 'Timer', 'on');
QUnit.test("on()", function () {
    
    var timer = Tempus.Timer();

    timer.after(20);
    timer.on('PT2S');

    equal(timer.ms, undefined, 'on() removes ms');
    equal(timer.runOn, 'PT2S');

    timer.run(function () {}).start();

    equal(timer.ms, 2000, 'timer.ms is 2000');
    equal(timer.timer.timerCalled, 'setTimeout', "setTimeout called");
    equal(timer.timer.time, 2000, "setTimeout called with 2000");

    timer.on('PT1M');
    equal(timer.ms, undefined, 'on() removes ms');
    equal(timer.runOn, 'PT1M');

    timer.run(function () {}).start();

    equal(timer.ms, 60000, 'timer.ms is 2000');
    equal(timer.timer.timerCalled, 'setTimeout', "setTimeout called");
    equal(timer.timer.time, 60000, "setTimeout called with 2000");

});

covers(Tempus.Timer.prototype, 'Timer', 'start');
QUnit.test(".after().start()", function () {
    var calls = []
    ,   timer = Tempus.Timer(function (){
            calls.push(arguments);
        }, 2000);

    equal(timer.timer, undefined, "Expects timer.timer to be undefined");

    timer.start();

    equal(timer.timer.time, 2000, "Expects timer.timer.time to be 2000");
    equal(timer.timer.timerCalled, 'setTimeout', "setInterval called");
    equal(timer.timer.cleared, false, "setTimeout not cleared yet");
    equal(calls.length, 0, "Not called immediately");
    equal(timer.runCount, 0, "runCount is 0");

    timer.timer.tick(1000);
    equal(calls.length, 0, "Not called after 1s");
    equal(timer.runCount, 0, "runCount is 0");

    timer.timer.tick(999);
    equal(calls.length, 0, "Not called after 1999ms");
    equal(timer.runCount, 0, "runCount is 0");

    timer.timer.tick(1);
    equal(calls.length, 1, "Called after 2000ms");
    equal(calls[0].length, 1);
    equal(calls[0][0] === timer, true, "1st arg is timer reference");
    equal(timer.runCount, 1, "runCount is 1");

    timer.timer.tick(2000);
    equal(calls.length, 1, "Not called");
    equal(calls[0].length, 1);
    equal(calls[0][0] === timer, true, "1st arg is timer reference");
    equal(timer.runCount, 1, "runCount is 1");

    var previousTimer = timer.timer;
    timer.start();
    calls = [];

    equal(previousTimer.cleared, true, "previousTimer is cleared");
    equal(timer.timer === previousTimer, false, 'new timer has been made');
    equal(timer.timer.time, 2000, "Expects timer.timer.time to be 2000");
    equal(timer.timer.timerCalled, 'setTimeout', "setInterval called");
    equal(timer.timer.cleared, false, "setTimeout not cleared yet");
    equal(calls.length, 0, "Not called immediately");
    equal(timer.runCount, 1, "runCount is 1");

    timer.timer.tick(2000);
    equal(calls.length, 1, "Called after 2000ms");
    equal(calls[0].length, 1);
    equal(calls[0][0] === timer, true, "1st arg is timer reference");
    equal(timer.runCount, 2, "runCount is 2");

});

covers(Tempus.Timer.prototype, 'Timer', 'start');
QUnit.test(".every().start()", function () {
    var calls = []
    ,   timer = Tempus.Timer(function (){
            calls.push(arguments);
        }).every(2000);

    equal(timer.timer, undefined, "Expects timer.timer to be undefined");

    timer.start();

    equal(timer.timer.time, 2000, "Expects timer.timer.time to be 2000");
    equal(timer.timer.timerCalled, 'setInterval', "setInterval called");
    equal(timer.timer.cleared, false, "setInterval not cleared yet");
    equal(calls.length, 0, "Not called immediately");
    equal(timer.runCount, 0, "runCount is 0");

    timer.timer.tick(1000);
    equal(calls.length, 0, "Not called after 1s");
    equal(timer.runCount, 0, "runCount is 0");

    timer.timer.tick(999);
    equal(calls.length, 0, "Not called after 1999ms");
    equal(timer.runCount, 0, "runCount is 0");

    timer.timer.tick(1);
    equal(calls.length, 1, "Called after 2000ms");
    equal(calls[0].length, 1);
    equal(calls[0][0] === timer, true, "1st arg is timer reference");
    equal(timer.runCount, 1, "runCount is 1");

    timer.timer.tick(2000);
    equal(calls.length, 2, "called again");
    equal(calls[1].length, 1);
    equal(calls[1][0] === timer, true, "1st arg is timer reference");
    equal(timer.runCount, 2, "runCount is 2");

    timer.timer.tick(1999);
    equal(calls.length, 2, "not called again");

    timer.timer.tick(1);
    equal(calls.length, 3, "called again");
    equal(calls[2].length, 1);
    equal(calls[2][0] === timer, true, "1st arg is timer reference");
    equal(timer.runCount, 3, "runCount is 4");

    var previousTimer = timer.timer;

    timer.start();
    calls = [];

    equal(previousTimer.cleared, true, "previousTimer is cleared");
    equal(timer.timer === previousTimer, false, 'new timer has been made');
    equal(timer.timer.time, 2000, "Expects timer.timer.time to be 2000");
    equal(timer.timer.timerCalled, 'setInterval', "setInterval called");
    equal(timer.timer.cleared, false, "setInterval not cleared yet");
    equal(calls.length, 0, "Not called immediately");
    equal(timer.runCount, 3, "runCount is 1");

    timer.timer.tick(2000);
    equal(calls.length, 1, "Called after 2000ms");
    equal(calls[0].length, 1);
    equal(calls[0][0] === timer, true, "1st arg is timer reference");
    equal(timer.runCount, 4, "runCount is 4");
});

covers(Tempus.Timer.prototype, 'Timer', 'stop');
QUnit.test("stop()", function () {
    var calls = []
    ,   timer = Tempus.Timer(function (){
            calls.push(arguments);
        }).every(2000).start();
        
    timer.stop();
    equal(timer.timer.cleared, true, "stop() clears timer");
    equal(calls.length, 0, "Timer has not run");

    timer.start();

    timer.timer.tick(1999);
    timer.stop();
    equal(timer.timer.cleared, true, "stop() clears timer");
    equal(calls.length, 0, "Timer has not run");

    timer.start();
    timer.timer.tick(3999);
    timer.stop();
    equal(timer.timer.cleared, true, "stop() clears timer");
    equal(calls.length, 1, "Timer has run once");

});