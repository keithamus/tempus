/**
    This file is here to cheat Node.js and node-qunit, overloading some of the
    global metods available which Tempus uses. It is, for all intents and
	purposes, a faux tempus.js
*/
require('./test.bootstrap.js');

covers = function () {};

Tempus = require('../tempus.js');
require('../tempus.timer.js')
require('../tempus.interval.js')

Date = oldDate;
setInterval = oldSetInterval;
setTimeout = oldSetTimeout;
clearInterval = oldClearInterval;
clearTimeout = oldClearTimeout;
module.exports = Tempus;