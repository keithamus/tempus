(function (glob) {
    // Inject fake objects into Tempus
    glob.oldDate = glob.Date;
    glob.oldSetInterval = glob.setInterval;
    glob.oldSetTimeout = glob.setTimeout;
    glob.oldClearInterval = glob.clearInterval;
    glob.oldClearTimeout = glob.clearTimeout;

    glob.FakeDate = glob.Date = function (a, b, c, d, e, f, g) {
        switch (arguments.length) {
            case 0: return new oldDate(1315774123519);
            case 1: return new oldDate(a);
            case 2: return new oldDate(a, b);
            case 3: return new oldDate(a, b, c);
            case 4: return new oldDate(a, b, c, d);
            case 5: return new oldDate(a, b, c, d, e);
            case 6: return new oldDate(a, b, c, d, e, f);
            default: return new oldDate(a, b, c, d, e, f, g);
        }
    };
    glob.fakeSetTimeout = glob.setTimeout = function (fn, time) {
        var run;
        return {
            cleared: false,
            timerCalled: 'setTimeout',
            time: time,
            fn: fn,
            currentTime: 0,
            tick: function (tick) {
                this.currentTime += tick;
                if (this.currentTime >= this.time && !run) {
                    run = true;
                    this.fn();
                }
            }
        };
    };

    glob.fakeSetInterval = glob.setInterval = function (fn, time) {
        return {
            cleared: false,
            timerCalled: 'setInterval',
            time: time,
            fn: fn,
            currentTime: 0,
            tick: function (tick) {
                this.currentTime += tick;
                if (~~(this.currentTime / this.time) >= 1) {
                    this.currentTime -= this.time;
                    this.fn();
                }
            }
        };
    };

    fakeClearInterval = glob.clearInterval = fakeClearTimeout = glob.clearTimeout = function (timer) {
        timer.cleared = true;
    };

    // Modifiy Array prototype to ensure no sloppy looping code:
    Array.prototype[13] = 'FAIL';
}(typeof window === 'undefined' ? global : window));