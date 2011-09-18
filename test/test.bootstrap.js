// Inject fake objects into Tempus
oldDate = Date;
oldSetInterval = setInterval;
oldSetTimeout = setTimeout;
oldClearInterval = clearInterval;
oldClearTimeout = clearTimeout;

this.FakeDate = Date = function (a, b, c, d, e, f, g) {
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
this.fakeSetTimeout = this.setTimeout = function (fn, time) {
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

this.fakeSetInterval = this.setInterval = function (fn, time) {
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
    }
};

fakeClearInterval = this.clearInterval = fakeClearTimeout = this.clearTimeout = function (timer) {
    timer.cleared = true;
};