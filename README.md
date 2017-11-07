> # No Longer Actively Maintained
> If someone would like to take over maintainence, feel free to get in touch ([@keithamus on twitter](https://twitter.com/keithamus)). I'll happily transfer this over.

# Tempus JS [![Build Status](https://secure.travis-ci.org/keithamus/Tempus.png?branch=master)](http://travis-ci.org/keithamus/Tempus)

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/keithamus/tempus?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Tempus is a full replacement for the Date object. It's official home is at 
[tempus-js.com](http://tempus-js.com), you can read lots more about the project
there.

## License

Tempus is licensed as MIT: http://keithamus.mit-license.org/ meaning it is free
for anyone to use. If you submit a pull request you agree to be bound by this
licensing, and agree to sign off all copyrights to Keith Cirkel.

## Clone, Test, Build the repository

You can clone the repository by running 

```
git clone --recursive git@github.com:keithamus/Tempus.git tempus
```

Build instructions are still up in the air at the moment. These docs will be 
updated when the correct build tool has been found.

To test in the browser, just open the `test/index.html` in a browser.

Testing in Node.JS can be done by first running `npm install`, followed by a 
`npm test`.

If you want to test in a headless browser, first install `phantomjs`, and run 
the tests with `phantomjs test/phantom-js-loader.js`.

## Developing Tempus

If you want to develop Tempus, best place is to start off with the [developer 
preface](http://tempus-js.com/docs/developer-preface), which tells you 
everything you need. The most important thing is to __ALWAYS__ submit tests with
your code.

## Working on the Website

If you want to work on the Website itself, then please go over to the 
[tempus-js.com git repository](http://github.com/keithamus/tempus-js.com).
