/*jslint laxcomma: true */
/**
 * Tempus - Time for a new Date()
 *
 * Tempus is a full replacement for Date(), the standard Date class in JavaScript.
 *
 * Tempus.interval module is for easily manipulating the difference between 2 dates
 *
 * This code is licensed under the MIT
 * For the full license see: http://keithamus.mit-license.org/
 * For more information see: http://keithamus.github.com/tempus
 *
 * @author Keith Cirkel ('keithamus') <tempus@keithcirkel.co.uk>
 * @license http://keithamus.mit-license.org/
 * @copyright (C) 2012, Keith Cirkel
 *
 */
 (function (global, Tempus, ArSlice, TYPE_STRING, TYPE_FUNCTION, TYPE_NUMBER, TYPE_ARRAY, TYPE_REGEXP, realTypeOf, undef) {
    // ^ Get some methods from the global object, close scope on them for protection

    var TIProto
    ,   ISOIntervalFragmentRegex = /^(\d+)([,\.]\d+)?(\w)/
    ,   ISOIntervalRegExp = /^([\+\-])?P((?:\d+(?:[,\.]\d+)?[YMWD])+)?(?:T((?:\d+(?:[,\.]\d+)?[HMS])+))?$/
    ,   intvlShorthand = ['Y', 'M', 'D', 'TH', 'TM', 'TS', 'TMS']
    ,   intvlSuffxies = ['%nY', '%nM', '%nD', '%nH', '%nM', '%nS', '%nMS']
    ,   intvlMethods = {
            'Y': 'FullYear',
            'M': 'Month',
            'D': 'Date',
            'TH': 'Hours',
            'TM': 'Minutes',
            'TS': 'Seconds',
            'TMS': 'Milliseconds'
        }
    ,   intvlUpperVals = [12, 30, 24, 60, 60, 1000, 1000]
    ,   intvlCount = intvlShorthand.length
    ,   intvlLOCALES = {};

    function intvltoString(dateQualifiers, timeSep, fragSep) {
        var fragments = []
            ,   value
            ,   neg = this.valueOf() < 0
            ,   overlap = 0
            ,   i = intvlCount;
            fragSep = fragSep || '';

            if (neg) this.swap();

            while(i--) {
                value = this['diff' + intvlMethods[intvlShorthand[i]]]() - overlap;
                overlap = 0;
                if (value) {
                    // Value is negative
                    if (value < 0) {
                        value = intvlUpperVals[i-1] + value - overlap;
                        overlap = 1;
                    }
                    fragments.unshift(((dateQualifiers[value] || dateQualifiers[0])[i]).replace('%n', value));
                }
                if (i == 3 && timeSep) fragments.unshift(timeSep);
            }

            if (neg) this.swap();

            if (fragments[fragments.length-1] == timeSep) fragments.pop();

            return fragments.join(fragSep);
    }

    
    function TempusInterval() {
        // If this was called without "new " then be friendly and do it for the user.
        if (!(this instanceof TempusInterval)) return new TempusInterval(arguments);

        // If we were only given 1 argument - an array - then use
        // that as the arguments otherwise just use arguments.
        var ar = !(1 in arguments) && /ar/.test(realTypeOf(arguments[0])) ? arguments[0] : arguments;

        // Set the "date from"
        this._dF = new Tempus(ar[0]);

        // Set the "date to"
        this._dT = this._dF.clone().set(ar[1]);

        // Set the LOCALE from the base LOCALE. This way we can have per-instance LOCALEs
        this._l = Tempus.LOCALE;

        return this;
    }

    /**
     * Add a locale to Tempus.Interval
     *
     * @param {String} localeName The name of your locale, e.g 'en-GB', 'en-US'
     * @param {Array} qualifiers 2d array, Names for each quantifying unit, from '%i year' down to '%i millisecond'
     * @param {Array} timing Suffix/Prefix for timing: 0: '%d ago', 1: 'in %d', 2: 'about %s'
     * @param {Array} unitSeparator Punctuation for separation: ', '
     *
     */
    TempusInterval.addLocale = function (localeName, qualifiers, timing, unitSeparator) {
        intvlLOCALES[localeName] = {
            Q: qualifiers,
            T: timing,
            S: unitSeparator
        };
    };
    
    TIProto = TempusInterval.prototype = {
        
        valueOf: function () {
            return +(this._dT) - +(this._dF);
        },
        
        toString: function (format) {
            return intvlLOCALES[this._l].T[+(this.valueOf() > 0)].replace('%d', intvltoString.call(this,
                intvlLOCALES[this._l].Q, // Qualifiers
                '',                      // No time separator
                intvlLOCALES[this._l].S  // Unit separator
            ));
        },

        swap: function () {
            var value = this._dT;
            this._dT = this._dF;
            this._dF = value;
            return this;
        },
        
        toISOString: function () {
            return (this.valueOf() < 0 ? '-' : '') + 'P' + intvltoString.call(this,
                [intvlSuffxies], // Qualifiers
                'T'              // 'T' time separator
            );
        }

        
    };

    TIProto.toJSON = TIProto.toISOString;

    function PSetIntvMethod(meth) {
        TIProto['diff' + meth] = function () {
            return this._dT['UTC' + meth]() - this._dF['UTC' + meth]();
        };
    }

    for(var meth in intvlMethods) PSetIntvMethod(intvlMethods[meth]);
    
    /***********************************************/
    /*           ISO8601 Interval Parser           */
    /*               (e.g +P3Y4M2D))               */
    /***********************************************/
    
    function parseISOInterveralFragment(matches, neg, isTime) {
        var i = matches.length
        ,   n;
        
        neg = neg ? 'sub' : 'add';
        
        // Loop through the matches...
        while(i--) {
            // value is the match (e.g. 3D) minus the last letter (e.g 3)
            matches[i] = matches[i].match(ISOIntervalFragmentRegex);
            
            // If we're looking at Times, add a T to the beginning of prop
            if (isTime) matches[i][3] = 'T' + matches[i][3];
            
            // Treat Weeks specially
            if (matches[i][3] === 'W') {
                this[neg + intvlMethods.D](+maches[i][0] * 7);
            } else {
                
                // Set the property using "subValue() or addValue()"
                this[ neg + intvlMethods[matches[i][3]] ].call(this, +matches[i][1]);
                
                // If we have a decimal, look for the next property in the line
                if ((+matches[i][2] || 0) > 0) {
                    // Parse the split decimal also:
                    n = AindexOf(intvlShorthand, +matches[i][3]) + 1 || intvlShorthand.length;
                    
                    this[ neg + intvlMethods[ intvlShorthand[n] ] ](+matches[i][1] * intvlUpperVals[n]);
                }
            }
        }
    }
    
    Tempus.addParser(
         // Our test function, returns true if the string a matches our regexp
        function (interval_string) {
            return ISOIntervalRegExp.test(interval_string);
        },
        // Our parser function
        function (intveral_string) {
            var matches;

            // Apply additional arguments from 1st, allowing functions like:
            // Tempus('P3D', 2012, 01, 01); -> returns 4th Jan
            // If there arent any more args, then we get todays date, which we need
            if (1 in arguments) this.set.apply(this, ArSlice.call(arguments, 1));
            
            // Our regex to split up the neg/pos, day, and time values.
            if (!(intveral_string = (''+intveral_string).match(ISOIntervalRegExp))) return false;
            
            // Match the date portion:
            if (intveral_string[2] && (matches = intveral_string[2].match(/\d+(?:[,\.]\d+)?[YMWD]/g))) {
                parseISOInterveralFragment.call(this, matches, intveral_string[1] == '-');
            }
            // Match the time portion:
            if (intveral_string[3] && (matches = intveral_string[3].match(/\d+(?:[,\.]\d+)?[HMS]/g))) {
                parseISOInterveralFragment.call(this, matches, intveral_string[1] == '-', true);
            }
            return this;
        },
        // We expect 1st arg to be string
        TYPE_STRING
    );

    // Add locale data:
    var pqualifiers = [], qualifiers = [
        '%n year', '%n month', '%n day',
        '%n hour', '%n minute', '%n second', '%n millisecond'
    ];
    for(i = 0; i < qualifiers.length; ++i) pqualifiers[i] = qualifiers[i] + 's';
    TempusInterval.addLocale('en', [pqualifiers, qualifiers], ['%d ago', 'in %d', 'about %s'], ', ');
    Tempus.Interval = TempusInterval;

}(this, Tempus, ([]).slice, 'string', 'function', 'number', 'array', 'regexp', Tempus.util.realTypeOf));