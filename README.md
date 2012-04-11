# Tempus JS

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