var defaultLists = require('./defaultlists');
var wordfilter = require('wordfilter');

wordfilter.removeWord('crip');

function createIsCool(opts) {
  var falsePositives = defaultLists.get('falsePositives');
  var extendedBlacklist = defaultLists.get('extendedBlacklist');
  var tragedyModeBlacklist = defaultLists.get('tragedyModeBlacklist');
  var whitelist = defaultLists.get('whitelist');
  var customBlacklist;
  var customWhitelist;
  var tragedyHappenedRecently = true;
  var logger;

  if (typeof opts === 'object') {
    if (opts.logger) {
      logger = opts.logger;
    }
    if (opts.falsePositives) {
      falsePositives = opts.falsePositives;
    }
    if (opts.extendedBlacklist) {
      extendedBlacklist = opts.extendedBlacklist;
    }
    if (opts.customBlacklist) {
      customBlacklist = opts.customBlacklist;
    }
    if (opts.tragedyModeBlacklist) {
      tragedyModeBlacklist = opts.tragedyModeBlacklist;
    }
    if ('tragedyHappenedRecently' in opts) {
      tragedyHappenedRecently = opts.tragedyHappenedRecently;
    }
    customWhitelist = opts.customWhitelist;
  }
  else if (typeof opts === 'string') {
    throw new TypeError('iscool constructor function expected an options object but received ' + opts);
  }

  function isCool(word) {
    var normalizedWord = word.toLowerCase();
    
    if (whitelist.indexOf(normalizedWord) !== -1) {
      return true;
    }
    else if (customWhitelist && customWhitelist.indexOf(normalizedWord) !== -1) {
      return true;
    }

    var cool = (falsePositives.indexOf(normalizedWord) === -1);

    if (cool) {
      cool = (extendedBlacklist.indexOf(normalizedWord) === -1);
    }

    if (cool) {
      cool = !wordfilter.blacklisted(normalizedWord);
    }

    if (cool && customBlacklist) {
      cool = (customBlacklist.indexOf(normalizedWord) === -1);
    }

    if (cool && tragedyHappenedRecently) {
      cool = (tragedyModeBlacklist.indexOf(normalizedWord) === -1);
    }

    if (!cool && logger) {
      logger.log('Uncool word: ' + word);
    }

    return cool;
  }

  return isCool;
}

module.exports = createIsCool;
