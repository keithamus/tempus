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
 * @copyright (C) 2012, Keith Cirkel
 *
 */
(function (global, Date, ArSlice, undef) {
    // ^ Get some methods from the global object, close scope on them for protection
    

    // Get the timemethods missing 'g' or 's' to save duplication
    var strftimeRegExp = /\%([OE])?([a-z%])/gi
    ,   TempusParsers = {} // our parsers (closed in scope)
    // for minification purposes...
    ,   TProto
    ,   TYPE_STRING = 'string'
    ,   TYPE_FUNCTION = 'function'
    ,   TYPE_NUMBER = 'number'
    ,   TYPE_ARRAY = 'array'
    ,   TYPE_REGEXP = 'regexp'
    ,   i;

    // The constructor, basically calls `set`
    function Tempus() {
        if (!(this instanceof Tempus)) return new Tempus(arguments);
        this.set.apply(this, !(1 in arguments) && /ar/.test(realTypeOf(arguments[0])) ? arguments[0] : arguments);
    }
    
    // A standard iterator we'll use quite a bit for each*of* methods
    function eachDate(i, count, plus, setMethod, getMethod, callback, dateObj) {
        for (var d; i <= count; i += plus) {
            d =  Tempus(dateObj || this)[setMethod](i);
            callback.call(this, d[getMethod](), d);
        }
        return this;
    }
    
    
    /*********************************/
    /*   Vatious Utility Functions   */
    /*********************************/
    /**
     * Get the actual type of a variable
     *
     * @param {Mixed} variable. The variable you want to check the type of
     *
     * @returns {String} One of 'array, regexp, string, number, function, date, object, undefined, null'
     *
     */
    var realTypeOf = function(v) {
        if (v === undef || v === null) return ''+v; // undefined
        return ({}).toString.call(v).match(/\w+/g)[1].toLowerCase();
    };

    // Firefox <3, IEs, `arguments` is an [object Object], not [object Argument].
    // We can fix this:
    if (realTypeOf(arguments) != 'arguments') {
        var _realTypeOf = realTypeOf;
        realTypeOf = function (v) {
           if (v && v.hasOwnProperty && v.hasOwnProperty('callee')) return 'arguments';
           return _realTypeOf(v);
        };
    }
        
    /**
     * Get the index of an item in an array
     *
     * @param {Array} haystack. The array you want to search in
     * @param {Mixed} needle. The item you want to find in `haystack`
     *
     * @returns {Number} -1 if not found, or a number from 0-n representing the array key.
     *
     */
    function arrIndexOf(a, v) {
        for (var i = 0; i < a.length; ++i) if (a[i] === v) return i;
        return -1;
    }
        
    /**
     * Get the number's ordinal suffix appended to the number, as a string
     *
     * @param {Number} num. The number you want to suffix
     *
     * @returns {String} An ordinal number string like '1st', '2nd', '3rd'
     *
     */
    function getOrdinal(num) {
        return [0, 'st', 'nd', 'rd'][num / 10 % 10 ^ 1 && num % 10] || 'th';
    }

        
    /**
     * Pad a string with [width] aditional characters of [padString]
     *
     * @param {String} string. The original string
     * @param {Number} width. How long (in chars) you want the string to be
     * @param {String} padString. What you want to pad the string with (defualt is '0')
     *
     * @returns {String} Such as '0001' (if args are ['1', 4]), or '-->' (if args are ['>', 3, '-'])
     *
     */
    function stringPad(string, width, padString) {
        width -= (''+string).length;
        return (width > 0 ? ( new Array(width+1) ).join( padString || 0 ) : '') + string;
    }

    // Expose the above util functions
    Tempus.util = {
        realTypeOf: realTypeOf,
        arrIndexOf: arrIndexOf,
        getOrdinal: getOrdinal,
        stringPad: stringPad
    };
    
    
    /*********************************************/
    /*                addParser                  */
    /*   (For registering custom date parsers)   */
    /*********************************************/
    
    /**
     * Register an algorythm for parsing custom date formats
     *
     * @param {Mixed} tester Function/RegExp Expects boolean. Is this parserModule able to parse the date?
     * @param {Function} parser Turn `this` (T) into a usable date.
     * @param {String} arg1Exepcts What your parser module expects arg1 to be
     * @param {String} argNExepcts What your parser module expects argN to be
     *
     */
    Tempus.addParser = function (tester, parser, len) {
        // If tester is passed as just a regexp, throw into function:
        var hasLength = realTypeOf(len) == TYPE_NUMBER;
        var ob = {
                test: tester,
                parse: parser,
                exp: ArSlice.call(arguments, 2+hasLength),
                length: (hasLength ? len : arguments.length - 2)
            }
        ,   ex = ob.exp[0];

        if (!ex) throw new Error('Missing type');
        
        return ((TempusParsers[ex] || (TempusParsers[ex] = [])).push(ob));
    };

    /**************************************/
    /*          TIME FORMATS              */
    /*   (Set outside of the prototype)   */
    /**************************************/
    
    var std_time_format = '%a, %d %b %Y %T %z'
    ,   TIME_FORMATS = Tempus.TIME_FORMATS = {
            ISO8601Date: '%Y-%m-%d',
            ISO8601: '%Y-%m-%dT%T.%L%z',
            COOKIE: '%A, %d-%b-%y %T %Z',
            RFC822: '%a, %d %b %y %T %z',
            RFC850: '%A, %d-%b-%y %T %Z',
            RFC1036: '%a, %d %b %y %T %z',
            RFC1123: std_time_format,
            RFC2822: std_time_format,
            RFC3339: '%Y-%m-%dT%T%Z',
            RSS: std_time_format,
            W3C: '%Y-%m-%dT%T%Z',
            Locale: '%a %b %d %Y %T GMT%z (%Oz)',
            GMT: '%a, %d %b %Y %T GMT',
            NCC1701: '%Y.%j'
        };
    
    
    /***********************************************/
    /*               Language Constants            */
    /*         (Set outside of the prototype)      */
    /***********************************************/
    
    Tempus.FULLMONTHS = [
            'January',     'February',     'March',
            'April',       'May',          'June',
            'July',        'August',       'September',
            'October',     'November',     'December'
    ];

    Tempus.SHORTMONTHS = [];
    i = 12;
    while (i--) {
        Tempus.SHORTMONTHS[i] = Tempus.FULLMONTHS[i].substr(0, 3);
    }
    
    Tempus.FULLDAYS = [
        'Sun',
        'Mon',
        'Tues',
        'Wednes',
        'Thurs',
        'Fri',
        'Satur'
    ];

    Tempus.SHORTDAYS = [];
    i = 7;
    while (i--) {
        Tempus.SHORTDAYS[i] = Tempus.FULLDAYS[i].substr(0, 3);
        Tempus.FULLDAYS[i] += 'day';
    }
    
    /***********************************************/
    /*               Prototype Methods             */
    /*              (Main Functionality)           */
    /***********************************************/
    
    TProto = Tempus.prototype = {
        
        constructor: Tempus,
        
        set: function () {
            var ar = !(1 in arguments) && /ar/.test(realTypeOf(arguments[0])) ? arguments[0] : arguments
            ,   aType = realTypeOf(ar[0])
            ,   modules;

            // No arguments means set to "now"
            if (!(0 in ar)) {
                this._date = new Date();
            
            // If only argument is a T object, then copy(T);
            } else if (ar[0] instanceof Tempus) {
                return this.copy(ar[0]);
            
            // If we only have one arg, and its a Date obj, or its a string and
            // matches the UTCREGEX (which all browsers' Date() can handle), or
            // its a number, then we can reasonably just new up a Date() object
            } else if (!(1 in ar) && /numb|date/.test(aType)) {
                this._date = new Date(ar[0]);
                
            // If the first arg is a number, and the second arg is a number,
            // lets just new up a Date() with numbers
            } else if (aType == TYPE_NUMBER && realTypeOf(ar[1]) == TYPE_NUMBER) {
                this._date = new Date(ar[0], ar[1], ar[2] || 1, ar[3] || 0, ar[4] || 0, ar[5] || 0, ar[6] || 0);
            
            // None of the standard attempts for date-parsing worked, lets try
            // any dateParser modules.
            } else if ((modules = TempusParsers[aType])) {
                
                for (var i = 0, module; (module = modules[i]); ++i) {
                    var exC = module.length;
                    if (ar.length < exC) continue;
                    if (exC > 1) {
                        while (exC--) {
                            if (ar[exC] !== undef && realTypeOf(ar[exC]) != module.exp[exC]) {
                                continue;
                            }
                        }
                    }
                    if (module.test.apply(this, ar)) {
                        this._date = new Date(0);
                        this.setTimezoneToLocale();
                        return module.parse.apply(this, arguments);
                    }
                }
            }
            
            // We got all the way down to here without a date object, lets just
            // give up and throw a friendly error message
            if (isNaN(+this._date)) {
                throw new Error('Invalid Date');
            }
            
            // Get REAL tz by flipping it, cache tz offset
            this.setTimezoneToLocale();
            
            // If we were passed `ar[8]` then someone wants a timezone, set it,
            // otherwise set it from the Date() object
            if (!!ar[7]) return this.timezone(ar[7]).hours(ar[3]);
            
            return this.setTimezoneToLocale();
        },
        
        clone: function () {
            return new Tempus(+this).timezone(this.timezone());
        },
        
        copy: function (tempusOrDateObject) {
            return this.set(+tempusOrDateObject).timezone(tempusOrDateObject.getTimezoneOffset());
        },
        
        /*************************************/
        /*          New Date Methods         */
        /*************************************/
        
        timeStamp: function (time) {
            if (0 in arguments) {
                this._date = new Date(time * 1000);
                return this;
            }
            return ~~(+(this) / 1000);
        },
        
        /*************************************/
        /*          New Year Methods         */
        /*************************************/

        century: function (setter) {
            if (0 in arguments) {
                return this.fullYear(''+(setter-1)+stringPad(this.year(), 2));
            }
            return -~(''+this.fullYear()).substr(0,2);
        },
        
        isLeapYear: function (year) {
            return new Date(year || this.fullYear(),1,29).getDate() == 29;
        },

        // fix getYear because it's broken
        year: function (year) {
            if (0 in arguments) return this.fullYear(+(''+year).substr(0, 2)+2000);

            return +(''+this.fullYear()).substr(2);
        },

        UTCYear: function (year) {
            if (0 in arguments) return this.UTCFullYear(+(''+year).substr(0, 2)+2000);

            return +(''+this.UTCFullYear()).substr(2);
        },
        
        /*************************************/
        /*         New Month Methods         */
        /*************************************/

        month: function (setter) {
            if (0 in arguments) {
                var newsetter;
                if (realTypeOf(setter) == TYPE_STRING) {
                    newsetter = arrIndexOf(Tempus.FULLMONTHS, setter);
                    newsetter = newsetter !== -1 ? newsetter : arrIndexOf(Tempus.SHORTMONTHS, setter);
                } else {
                    newsetter = +setter;
                }
                this._date.setMonth(newsetter);
                return this;
            }
            return this._date.getMonth();
        },
        
        oneIndexedMonth: function (month) {
            return (0 in arguments) ? this.month(month - 1) : this.month()+1;
        },
        
        UTCOneIndexedMonth: function (month) {
            return (0 in arguments) ? this.UTCMonth(month - 1) : this.UTCMonth()+1;
        },
        
        getMonthName: function (full) {
            return Tempus[full ? 'FULLMONTHS' : 'SHORTMONTHS'][this.month()];
        },
        
        getFullMonthName: function () {
            return this.getMonthName(true);
        },
        
        getLastDayOfMonth: function () {
            var d = new Date(this._date);
            d.setMonth(d.getMonth() + 1);
            d.setDate(-1);
            return d.getDate() + 1;
        },
        
        /*************************************/
        /*          New Week Methods         */
        /*************************************/
        
        week: function (setter) {
            return (0 in arguments) ?
				// subtract the number of days since the last Friday on Jan 1st.
				this.dayOfYear(setter * 7 - (this.dayOfYear(1).day() + 2) % 7)
            :
                Math.ceil(Tempus(this).day(4).dayOfYear() / 7)
            ;
        },
        
        getWeekOrdinal: function () {
            return getOrdinal(this.week());
        },
        
        eachWeekOfMonth: function (callback) {
            var d = Tempus(this);
            return eachDate.call(this, d.date(1).week(), d.date(d.getLastDayOfMonth()).week(), 1, 'week', 'week', callback, d);
        },
        
        eachWeekOfYear: function (callback) {
            return eachDate.call(this, 1, 53, 1, 'week', 'week', callback);
        },
        
        /*************************************/
        /*           New Day Methods         */
        /*************************************/
        
        day: function (setter) {
            return (0 in arguments) ?
                // The setter given is a day number, say, 4 (Thursday), so this op will set the
                // date to the nearest Thursday, by taking the current date, adding the daynum (so 4
                // for Thursday), taking away the ISO day of week. Look at this table:
                // | Day Name | +4, the day is |  Take away | Ending With |
                // |  Monday  |     Friday     |      1     |   Thursday  |
                // | Tuesday  |    Saturday    |      2     |   Thursday  |
                // | Wednesday|     Sunday     |      3     |   Thursday  |
                // | Thursday |     Monday     |      4     |   Thursday  |
                // |  Friday  |    Tuesday     |      5     |   Thursday  |
                // | Saturday |    Wednesday   |      6     |   Thursday  |
                // |  Sunday  |    Thursday    |      7     |   Thursday  |
                this.day() !== setter ? this.addDate(setter - this.ISODay()) : this
            :
                this._date.getDay();
        },
        
        UTCDay: function (setter) {
            return (0 in arguments) ?
                // The setter given is a day number, say, 4 (Thursday), so this op will set the
                // date to the nearest Thursday, by taking the current date, adding the daynum (so 4
                // for Thursday), taking away the ISO day of week. Look at this table:
                // | Day Name | +4, the day is |  Take away | Ending With |
                // |  Monday  |     Friday     |      1     |   Thursday  |
                // | Tuesday  |    Saturday    |      2     |   Thursday  |
                // | Wednesday|     Sunday     |      3     |   Thursday  |
                // | Thursday |     Monday     |      4     |   Thursday  |
                // |  Friday  |    Tuesday     |      5     |   Thursday  |
                // | Saturday |    Wednesday   |      6     |   Thursday  |
                // |  Sunday  |    Thursday    |      7     |   Thursday  |
                this.UTCDay() !== setter ? this.addUTCDate(setter - this.UTCISODay()) : this
            :
                this._date.getUTCDay();
        },
        
        ISODay: function (setter) {
            return (0 in arguments) ? this.day(setter === 7 ? 0 : setter) : this.day() || 7;
        },
        
        UTCISODay: function (setter) {
            return (0 in arguments) ? this.UTCDay(setter === 7 ? 0 : setter) : this.UTCDay() || 7;
        },
        
        getDayName: function () {
            return Tempus.SHORTDAYS[this.day()];
        },
        
        getFullDayName: function () {
            return Tempus.FULLDAYS[this.day()];
        },
        
        dayOfYear: function (day) {
            if (0 in arguments) return this.month(0).date(day);
            
            day = this.date();
            var i = this.month()
            ,   d = Tempus(this);
            
            while(i--) day += d.month(i + 1).date(-1).date() + 1;
            
            return day;
        },
        
        getDateOrdinal: function () {
            return getOrdinal(this.date());
        },

        eachDayOfWeek: function (callback) {
            var d = Tempus(this).day(0);
            return eachDate.call(this, d.date(), d.date() + 6, 1, 'date', 'date', callback, d);
        },

        eachISODayOfWeek: function (callback) {
            var d = Tempus(this).ISODay(1);
            return eachDate.call(this, d.date(), d.date() + 6, 1, 'date', 'date', callback, d);
        },
        
        eachDayOfMonth: function (callback) {
            return eachDate.call(this, 1, this.getLastDayOfMonth(), 1, 'date', 'date', callback);
        },
        
        eachDayOfYear: function (callback) {
            return eachDate.call(this, 1, 365+this.isLeapYear(), 1, 'dayOfYear', 'dayOfYear', callback);
        },
        
        /*************************************/
        /*          New Time Methods         */
        /*************************************/
        
        // Fix hours to use a settable time-zone
        hours: function (hours) {
            if (0 in arguments) return this.UTCHours((+hours) + ~~((-this.TIMEZONE) / 60));
            
            hours = this.getUTCHours() + (this.TIMEZONE / 60);
            return hours == 24 ? 0 : hours;
        },
        
        ordinalHours: function (setter) {
            if (0 in arguments) return this.hours(this.AMPM() === 'PM' ?  setter + 12 : setter);

            setter = this.hours();
            return setter ? setter > 12 ? setter - 12: setter : 12;
        },

        UTCOrdinalHours: function (setter) {
            if (0 in arguments) return this.UTCHours(this.AMPM() === 'PM' ?  setter + 12 : setter);
            
            setter = this.UTCHours();
            return setter ? setter > 12 ? setter - 12: setter : 12;
        },
        
        // Fix minutes to use a settable time-zone
        minutes: function (setter) {
            if (0 in arguments) return this.UTCMinutes((+setter) + (-(this.TIMEZONE) % 60));

            return this.getUTCMinutes() + (this.TIMEZONE % 60);
        },
        
        microSeconds: function (setter) {
            if (0 in arguments) return this.milliseconds(~~(setter/1000));
            
            return this.milliseconds()*1000;
        },
        
        UTCMicroSeconds: function (setter) {
            if (0 in arguments) return this.UTCMilliseconds(~~(setter/1000));
            
            return this.getUTCMilliseconds()*1000;
        },
        
        AMPM: function (setter) {
            if (0 in arguments) return this.hours(this.hours() + (this.AMPM() === setter.toUpperCase() ? 0 : /am/i.test(setter) ? -12 : 12));

            return this.hours() > 11 ? 'PM' : 'AM';
        },
        
        ampm: function (setter) {
            if (0 in arguments) return this.AMPM(setter);
            return this.AMPM().toLowerCase();
        },

        timeString: function (setter) {
            if (0 in arguments) {
                setter = setter.split(':');
                this.hours(setter[0]).minutes(setter[1]).seconds(setter[2]);
                return this;
            }
            return [stringPad(this.hours(), 2), stringPad(this.minutes(), 2), stringPad(this.seconds(), 2)].join(':');
        },

        clearTime: function () {
            return this.timeString('00:00:00').milliseconds(0);
        },
    
        setTimeToNow: function () {
            var d = new Date();
            return this.hours(d.getHours()).minutes(d.getMinutes()).seconds(d.getSeconds()).milliseconds(d.getMilliseconds());
        },
        
        timezoneOffset: function (tzoff) {
            if (0 in arguments) {
                this.TIMEZONE = -tzoff;
                return this;
            }
            return -this.TIMEZONE;
        },
        
        setTimezoneToLocale: function () {
            return this.timezone(this._date.getTimezoneOffset());
        },
        
        timezone: function (tz) {
            if (realTypeOf(tz) === TYPE_NUMBER) return this.timezoneOffset(tz);
            if (0 in arguments) {
                if (/^[zZ0]$/.test(tz)) return this.timezoneOffset(0);
                tz = (''+tz).match(/^(.)(\d{2}).?(\d{2})$/);
                var tzi = ~~(+(tz[2]) * 60) + ~~(+tz[3]);
                return this.timezoneOffset(tz[1] === '-' ? tzi : -tzi);
            }
            tz = this.TIMEZONE;
            if(tz < 0) tz = -tz;
            return (this.TIMEZONE < 0 ? '-' : '+') + (stringPad(~~(tz/60),2)) + (stringPad(~~(tz%60),2));
        },
        
        ISOTimezone: function (setter) {
            if (0 in arguments) return this.timezone(setter);

            return this.timezone().replace(/(\d{2})$/, ':$1');
        },
        
        isDST: function () {
            return Tempus(this.fullYear(), 0).TIMEZONE < this.TIMEZONE || Tempus(this.fullYear(), 5).TIMEZONE < this.TIMEZONE;
        },
                
        /*************************************/
        /*           String Methods          */
        /*************************************/
        
        toString: function (format) {
            if (!format) format = '%a %b %d %Y %T %z';
            
            var self = this;
            
            // Shortcut to pre-created format CONSTANTS
            if (TIME_FORMATS[format]) format = TIME_FORMATS[format];
            
            return format.replace(strftimeRegExp, function (chunk, prefix, proc) {
                var newproc = Tempus.FORMAT_PROCESSORS[proc];
            
                if (!newproc) return chunk;
                
                if (realTypeOf(newproc) == TYPE_ARRAY)
                    return stringPad(newproc[0].call(self), newproc[1], newproc[2]);
                    
                if (realTypeOf(newproc) == TYPE_FUNCTION) {
                    return newproc.call(self);
                }
                                
                return self.toString.call(self, newproc);
            });
        },

        /*************************************/
        /*       Comparison Methods          */
        /*************************************/

        isEqual: function () {
            return +(this) == +Tempus(arguments);
        },

        isBefore: function () {
            return +(this) < +Tempus(arguments);
        },
        
        isAfter: function () {
            return +(this) > +Tempus(arguments);
        }
    };
    

    /***********************************************/
    /*             Set to*String methods           */
    /***********************************************/
    function PTimeFormat(i) {
        TProto['to' + i + 'String'] = function () {
            return this.toString(TIME_FORMATS[i]);
        };
    }

    for (i in TIME_FORMATS) PTimeFormat(i);

    var dateMethods = [
        'toDateString',
        'toLocaleDateString',
        'toLocaleTimeString',
        'toLocaleString',
        'toTimeString',
        'toUTCString',
        'toGMTString',
        'valueOf'
    ];
    
    function PDateMethod(methodname) {
        TProto[methodname] = function () {
            return this._date[methodname].apply(this._date, arguments);
        };
    }
    
    i = dateMethods.length;
    while (i--) PDateMethod(dateMethods[i]);
    
    
    
    // Define getter/setter methods without the prefex so we can handle generically
    var dateSetMethods = [
        'year', 'fullYear',
        'month', 'oneIndexedMonth',
        'week',
        'day', 'ISODay', 'date', 'dayOfYear',
        'hours', 'ordinalHours',
        'minutes',
        'seconds', 'milliseconds', 'microSeconds',
        'time', 'timezone', 'timezoneOffset', 'ISOTimezone', 'timeStamp', 'AMPM', 'ampm', 'century'];
    
    function PDateSetMethod(methodname) {
        var lmethodname = methodname;
            methodname = methodname == 'ampm' ? 'ampm' : methodname.charAt(0).toUpperCase() + methodname.slice(1);

        if (!TProto['get' + methodname]) {
            TProto['get' + methodname] =
            TProto[lmethodname] ?
                function () {
                    return this[lmethodname]();
                }
            :
                function () {
                    return this._date['get' + methodname].call(this._date);
                }
            ;
        }
        
        if(!TProto['set' + methodname]) {
            TProto['set' + methodname] =
            TProto[lmethodname] ?
                function () {
                    return this[lmethodname].apply(this, arguments);
                }
            :
                function () {
                    this._date['set' + methodname].apply(this._date, arguments);
                    return this;
                }
            ;
        }
        
        if (!/^am|isot|timez/i.test(dateSetMethods[i])) {
            TProto['add' + methodname] = function (setter) {
                this[lmethodname](this[lmethodname]() + (setter || 1));
                return this;
            };
            
            TProto['sub' + methodname] = function (setter) {
                this[lmethodname](this[lmethodname]() - (setter || 1));
                return this;
            };
        }
        
        if (!TProto[lmethodname]) {
            TProto[lmethodname] = function (setter) {
                if (0 in arguments) {
                    this['set' + methodname](setter);
                    return this;
                } else {
                    return this['get' + methodname]();
                }
            };
        }

        if (!/^UTC|[cw]e|AMPM|i?s?o?time[sz]|time$|dayo/i.test(methodname))
            PDateSetMethod('UTC' + methodname);
    }
    
    i = dateSetMethods.length;
    while (i--) {
        PDateSetMethod(dateSetMethods[i]);
    }

    // addYear() and subYear() should just call addFullYear()/subFullYear()
    TProto.addYear = TProto.addFullYear;
    TProto.subYear = TProto.subFullYear;
    TProto.toJSON = TProto.toISO8601String;
    Tempus.now = Date.now;


    /*********************************************/
    /*        Format Processors (strftime)       */
    /*********************************************/
    Tempus.FORMAT_PROCESSORS = {
        a: TProto.getDayName,                 // (Py, Rb, PHP) The weekday name: Sun to Sat
        A: TProto.getFullDayName,             // (Py, Rb, PHP) The full weekday name: Sunday to Saturday
        b: TProto.getMonthName,               // (Py, Rb, PHP) Month name Jan to Dec
        B: TProto.getFullMonthName,           // (Py, Rb, PHP) Month name January to December
        c: '%a %b %d %T %Y',                  // (Py, Rb, PHP) To preferred locale str
        C: TProto.century,                    // (Py, Rb, PHP) Century e.g 2009 = 20
        d: [TProto.date, 2],                  // (Py, Rb, PHP) Day of month 01-31
        D: '%m/%d/%y',                        // (Py, Rb, PHP) Date, e.g 10/09/11
        e: [TProto.date, 2, ' '],             // (Py, Rb, PHP) Day of month (space padded) " 1"-"31"
        f: [TProto.microSeconds, 6],          // (Py) Microseconds, zero-padded (000000-999999)
        F: '%Y-%m-%d',                        // (Py, Rb, PHP) Date, e.g  2011-09-10
        g: TProto.year,                       // (Py, Rb, PHP) 2 digit year e.g 11
        G: TProto.fullYear,                   // (Py, Rb, PHP) 4 digit year e.g 2011
        h: '%b',                              // (Py, Rb, PHP) Month name Jan to Dec
        H: [TProto.hours, 2],                 // (Py, Rb, PHP) 24-hour clock 00-23
        I: [TProto.ordinalHours, 2],          // (Py, Rb, PHP) 12-hour clock 01-12
        j: [TProto.dayOfYear, 3],             // (Py, Rb, PHP) Day of Year 001-366
        k: [TProto.hours, 2, ' '],            // (Rb, PHP) 24-hour clock with spaces: " 1"-"23"
        l: [TProto.ordinalHours, 2, ' '],     // (Rb, PHP) 12-hour clock with spaces: " 1"-"12"
        L: [TProto.milliseconds, 3],          // (Rb) Milliseconds (000-999)
        m: [TProto.oneIndexedMonth, 2],       // (Py, Rb, PHP) Month 01-12
        M: [TProto.minutes, 2],               // (Py, Rb, PHP) Minutes 00-59
        n: "\n",                              // (Py, Rb, PHP) Newline (\n)
        o: TProto.getDateOrdinal,             // **New** (inspired by perl Date::Format) Get date ordinal suffix: e.g "th"
        p: TProto.AMPM,                       // (Py, Rb, PHP) "AM" or "PM"
        P: TProto.ampm,                       // (Py, Rb, PHP) "am" or "pm"
        r: '%I:%M:%S %p',                     // (Py, Rb, PHP) 12-hour time (e.g 03:02:01 am)
        R: '%H:%M',                           // (Py, Rb, PHP) 24-hour time (e.g 03:02)
        s: TProto.timeStamp,                  // (Py, Rb, PHP) Epoch Timestamp (e.g 1315774123519)
        S: [TProto.seconds, 2],               // (Py, Rb, PHP) Seconds (00-59)
        t: "\t",                              // (Py, Rb, PHP) Tab character (\t)
        T: TProto.timeString,                 // (Py, Rb, PHP) 24-hour timestamp (e.g 03:02:01)
        u: TProto.ISODay,                     // (Py, Rb, PHP) Day of week 1(Monday)-7
        U: [TProto.week, 2],                  // (Py, Rb, PHP) Week number (00-52)
        V: '%U',                              // (Py, Rb, PHP) Week number (00-52)
        w: TProto.day,                        // (Py, Rb, PHP) Day of week 0(Sunday)-6
        W: '%U',                              // (Py, Rb, PHP) Week number (00-52)
        // Ditch %X and %x for this release, because toLocale*String is so variable across systems/browsers
        // x: TProto.toLocaleDateString,         // (Py, Rb, PHP) To preferred locale date str
        // X: TProto.toLocaleTimeString,         // (Py, Rb, PHP) To preferred locale time str
        y: [TProto.year, 2],                  // (Py, Rb, PHP) 2 digit year (00-99)
        Y: TProto.fullYear,                   // (Py, Rb, PHP) 4 digit year e.g 2011
        z: TProto.getTimezone,                // (Py, Rb, PHP) Time zone as hour offset
        Z: TProto.getISOTimezone,             // (Py, Rb, PHP) Time zone name (e.g EST, GMT)
        '%': '%'                              // (Py, Rb, PHP) A literal % char
    };

    /*************************************/
    /*        Default Date Parsers       */
    /*************************************/
    
    /***********************************************/
    /*               Reverse Formatter             */
    /*           (for T(string, string))           */
    /***********************************************/
    
    var rg_word_boundary = '[^\\b]+'
    ,   rg_digit2 = '\\d{2}'
    ,   rg_digit3 = '\\d{3}'
    ,   rg_digit4 = '\\d{4}'
    ,   rg_spacedigit = '(?:\\s|\\d)\\d'
    ,   rg_time = '\\d{2}:\\d{2}:\\d{2}'
    ,   rg_date = '\\d{4}-\\d{2}-\\d{2}'
    ,   rg_tz = 'Z|GMT|(?:GMT)?[-+]\\d{2}\\:?\\d{2}';
    
    Tempus.REVERSE_FORMAT_PROCESSORS = {
        a: ['(?:' + Tempus.SHORTDAYS.join('|') + ')?,?'],
        A: ['(?:' + Tempus.FULLDAYS.join('|') + ')?,?'],
        b: ['(?:' + Tempus.SHORTMONTHS.join('|') + ')', TProto.month],
        B: ['(?:' + Tempus.FULLMONTHS.join('|') + ')', TProto.month],
        C: [rg_digit2, TProto.century],
        d: [rg_digit2, TProto.date],
        D: [rg_date, ''],
        e: ['\\s?[\\d{1,2}]'],
        f: ['\\d{6}', TProto.microseconds],
        F: [rg_date, ''],
        g: [rg_digit2, ''],
        G: [rg_digit4, ''],
        h: [rg_word_boundary, ''],
        H: [rg_digit2, TProto.hours],
        I: [rg_digit2, ''],
        j: [rg_digit3, ''],
        k: [rg_spacedigit, ''],
        l: [rg_spacedigit, ''],
        L: [rg_digit3, TProto.milliseconds],
        m: [rg_digit2, TProto.oneIndexedMonth],
        M: [rg_digit2, TProto.minutes],
        n: ['\\n'],
        o: ['th|td|st'],
        p: ['AM|PM', TProto.ampm],
        P: ['am|pm', TProto.ampm],
        r: [rg_time + ' (am|pm)'],
        R: ['(\\d{2}):(\\d{2})'],
        s: ['\\d+', TProto.timeStamp],
        S: [rg_digit2, TProto.seconds],
        t: ['\\t'],
        T: [rg_time, TProto.timeString],
        u: [rg_digit2, ''],
        U: [rg_digit2, ''],
        V: [rg_digit2, ''],
        w: [rg_digit2, ''],
        W: [rg_digit2, TProto.week],
        y: [rg_digit2, TProto.year],
        Y: [rg_digit4, TProto.fullYear],
        z: [rg_tz, TProto.timezone],
        Z: [rg_tz, TProto.timezone],
        '%': ['%']
    };

    function makeReverseRegex(format, formatFunction) {
        return format
            .replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            .replace(strftimeRegExp, function (chunk, prefix, proc) {
                var newproc = Tempus.REVERSE_FORMAT_PROCESSORS[proc];
                if (!newproc) return chunk;
                
                formatFunction.push(newproc[1]);
                
                return '(' + newproc[0] + ')';
            });
    }

    var DEFAULT_REVERSE_FORMATTER = [], DEFAULT_REVERSE_FORMATTER_REGEX = [];
    for (var fmt in TIME_FORMATS) {
        DEFAULT_REVERSE_FORMATTER.push(fmt);
        DEFAULT_REVERSE_FORMATTER_REGEX.push(makeReverseRegex(TIME_FORMATS[fmt], []));
    }

    DEFAULT_REVERSE_FORMATTER_REGEX = new RegExp('^'+ DEFAULT_REVERSE_FORMATTER_REGEX.join('|') + '$');

    Tempus.addParser(
        function (a, b) {
            b = realTypeOf(b) == TYPE_ARRAY && 0 in b? b[0] : b;
            // lastIndex needs to be reset for some browsers, i.e Safari. Issue #11
            strftimeRegExp.lastIndex = 0;
            return !!TIME_FORMATS[b] || strftimeRegExp.test(b) || DEFAULT_REVERSE_FORMATTER_REGEX.test(a);
        },
        function (string, format) {
            var match
            ,   self = this
            ,   formatReg
            ,   formatFunction = []
            ,   i
            ,   timezone
            ,   hours
            ,   days;

            format = format == undef ? DEFAULT_REVERSE_FORMATTER : format;

            if (realTypeOf(format) == TYPE_ARRAY) {
                for(i = 0; i in format; i++)
                    try { return this.set(string, format[i]); } catch(e){}
                throw new Error("Cannot parse '" + string + "' with '" + format + "'");
            }

            if (TIME_FORMATS[format]) format = TIME_FORMATS[format];
            formatReg = format ? makeReverseRegex(format, formatFunction) : DEFAULT_REVERSE_FORMATTER;

            match = string.match('^' + formatReg + '$');
            
            if (!match)
                throw new Error("Cannot parse '" + string + "' with '" + format + "'");
            
            i = match.length;
            while(i--) {
                // Timezone should be set very last otherwise it'll screw up `hours`
                if (formatFunction[i-1] === TProto.timezone && (timezone = match[i])) continue;
                // Date should be set after month, that way it doesn't end up jumping to the next month
                if (formatFunction[i-1] === TProto.date && (days = match[i])) continue;

                if (realTypeOf(formatFunction[i-1]) == TYPE_FUNCTION) {
                    formatFunction[i-1].call(this, match[i]);
                }
            }

            this.date(days);

            if (timezone !== undef) {
                this.setTimezoneToLocale();
                hours = this.hours();
                this.timezone(timezone);
                this.hours(hours);
            }

            return this;
        },
        // We expect a minimum of one argument.
        1,
        // We expect 1st arg to be string
        TYPE_STRING,
        // And the second arg (if present) should also be a string
        TYPE_STRING
    );

    // <% MODULE_INJECTION %> //

    if (typeof module != 'undefined' && module.exports) {
        module.exports = Tempus;
    } else if (typeof define == "function" && define.amd) {
        define('Tempus', [], function () { return Tempus; });
    } else {
        global.Tempus = Tempus;
    }
    
}(this, Date, ([]).slice));