iscool
======

This module provides a function you can use to find out if a word is cool, where "cool" is defined as "not a bummer for me to see spit out by a [Twitter bot](https://twitter.com/godtributes)." Uncool words include racist, sexist, or transphobic slurs. It also has words that may not be slurs but have terrible associations and are chilling (to me) to see in generated text from something that's supposed to be fun, like "Nazi".

It compares candidates to a few lists containing words (many of which were discovered via @godtributes spitting them out live) and falls back to [Wordfilter](https://github.com/dariusk/wordfilter) after that.

Installation
------------

    npm install iscool

Usage
-----

    var createIsCool = require('iscool');
    isCool = createIsCool();
    isCool('trees');
    // true

When creating the function, you can specify the following options:

- `customBlacklist`: An array of extra words that you consider uncool.
- `logger`: An object with a `log` method. If you pass this, iscool will call `log` with a message about an uncool word whenever it finds one.
- `tragedyHappenedRecently`: If this is true, it will check candidates against `tragedyModeBlacklist`, which contains words that are a bummer in light of current events. In practice, this is basically always true.
- `tragedyModeBlacklist`: There is a [default tragedyModeBlacklist](https://github.com/jimkang/iscool/blob/master/defaultlists.js), so you do not have to provide one, but if you do it will override the default one.
- `extendedBlacklist`: There is a [default extendedBlacklist](https://github.com/jimkang/iscool/blob/master/defaultlists.js) containing words that are not cool. It is extended in the sense that `wordfilter` may not contain them. You can override it with this option.
- `falsePositives`: There is a [default falsePositives](https://github.com/jimkang/iscool/blob/master/defaultlists.js), so you do not have to provide one, but if you do it will override the default one. This is a list of words that are not really words I want a bot to use, even if they're not horrible. It's stuff like "imo" and "http".

Example:

    var isCool = createIsCool({
      customBlacklist: [
        'hastur',
        'voldemort'
      ],
      logger: console
    });

    isCool('hastur');
    // false
    // Uncool word: hastur

Tests
-----

Run tests with `make test`.

License
-------

MIT.
