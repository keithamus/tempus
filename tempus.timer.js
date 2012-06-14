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
(function (global, Tempus, ArSlice, realTypeOf, undef) {
    // ^ Get some methods from the global object, close scope on them for protection

    var tsetTimeout = setTimeout
    ,   tsetInterval = setInterval
    ,   tclearTimeout = clearTimeout
    ,   tclearInterval = clearInterval;


    /***********************************************/
    /*               Timer Functions               */
    /***********************************************/

    function Timer() {
        // If this was called without "new " then be friendly and do it for the user.
        if (!(this instanceof Timer)) return new Timer(arguments);

        // If we were only given 1 argument - an array - then use
        // that as the arguments otherwise just use arguments.
        var ar = !(1 in arguments) && /ar/.test(realTypeOf(arguments[0])) ? arguments[0] : arguments;

        // Set some defaults
        this.isInterval = false;
        this.ctx = ar[2] || this;
        this.runCount = 0;

        // Set the optional arguments.
        if (typeof ar[0] == 'function') this.run(ar[0]);
        if (ar[1]) this.after(ar[1]);
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

        on: function () {
            this.runOn = ArSlice.call(arguments, 0);
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
            if (this.ms == undef) this.ms = (+Tempus(this.runOn)) - (+Tempus());

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

}(this, Tempus, [].slice, Tempus.util.realTypeOf));