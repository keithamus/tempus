/*jslint laxcomma: true */
/**
 * Tempus - Time for a new Date()
 *
 * Tempus is a full replacement for Date(), the standard Date class in JavaScript.
 *
 * This code is licensed under the MIT
 * For the full license see: http://keithamus.mit-license.org/
 * For more information see: http://keithamus.github.com/tempus
 *
 * @author Keith Cirkel ('keithamus') <tempus@keithcirkel.co.uk>
 * @license http://keithamus.mit-license.org/
 * @copyright Copyright © 2011, Keith Cirkel
 *
 */
(function (global, Tempus, undef) {
    // ^ Get some methods from the global object, close scope on them for protection

    var tsetTimeout = setTimeout
    ,   tsetInterval = setInterval
    ,   tclearTimeout = clearTimeout
    ,   tclearInterval = clearInterval;


    /***********************************************/
    /*               Timer Functions               */
    /***********************************************/

    function Timer(fn, after, ctx) {
        if (!(this instanceof Timer)) return new Timer(fn, after);

        this.isInterval = false;
        this.ctx = ctx || this;
        this.runCount = 0;
        if (typeof fn == 'function') this.run(fn);
        if (after) this.after(after);
    }

    Timer.prototype = {

        constructor: Timer,
        
        run: function (fn) {
            this.fn = fn;
            return this;
        },

        context: function (context) {
            this.ctx = context;
            return this;
        },

        on: function (on) {
            this.runOn = on;
            delete this.ms;
            this.interval = false;
            return this;
        },

        after: function (ms) {
            this.ms = +ms;
            this.interval = false;
            return this;
        },

        every: function (ms) {
            this.after(ms).interval = true;
            return this;
        },

        start: function () {
            var timerFn = this.interval ? tsetInterval : tsetTimeout,
                self = this;
            if (this.ms == undef) this.ms = (+new Tempus(this.runOn)) - (+new Tempus());

            this.stop().timer = timerFn(function () {
                self.exec();
            }, this.ms);

            return this;
        },

        exec: function () {
            this.runCount++;
            this.fn.call(this.ctx, this);
            return this;
        },

        stop: function () {
            var clearFn = this.isInterval ? tclearInterval : tclearTimeout;

            if (this.timer) clearFn(this.timer);
            return this;
        }

    };

    Tempus.Timer = Timer;

}(this, Tempus));