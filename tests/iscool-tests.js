var createIsCool = require('../iscool');
var test = require('tape');

test('Basic test', function basicTest(t) {
  var isCool = createIsCool();
  t.ok(!isCool('swastika'));
  t.ok(!isCool('nazi'));
  t.ok(!isCool('nazidom'));
  t.ok(!isCool('holocaust'));
  t.ok(!isCool('islamist'));
  t.ok(!isCool('jihadist'));
  t.ok(!isCool('klan'));
  t.ok(!isCool('abuser'));
  t.ok(!isCool('n-word'));
  t.ok(!isCool('RIP'));
  t.end();
});

test('Test case insensitivity', function testCaseInsensitivity(t) {
  var isCool = createIsCool();
  t.ok(isCool('jello'));
  t.ok(isCool('Jello'));
  t.ok(!isCool('Negro'));
  t.ok(!isCool('negro'));
  t.ok(!isCool('Coon'));
  t.ok(!isCool('coon'));
  t.end();
});

test('Custom blacklist', function testCustomBlacklist(t) {
  var isCool = createIsCool({
    customBlacklist: ['hastur', 'voldemort']
  });
  t.ok(!isCool('hastur'));
  t.ok(!isCool('Voldemort'));
  t.ok(isCool('Old Scratch'));
  t.ok(!isCool('nazi'));
  t.end();
});

test('Tragedy mode on', function tragedyTest(t) {
  var isCool = createIsCool({
    tragedyHappenedRecently: true
  });
  t.ok(!isCool('chokehold'));
  t.ok(!isCool('coroner'));
  t.ok(!isCool('eric'));
  t.ok(!isCool('garner'));
  t.ok(!isCool('torture'));
  t.ok(!isCool('torturer'));
  t.ok(!isCool('ukraine'));
  t.ok(!isCool('donetsk'));
  t.ok(!isCool('jihad'));
  t.ok(!isCool('grieving'));
  t.end();
});

test('Tragedy mode off', function tragedyOffTest(t) {
  var isCool = createIsCool({
    tragedyHappenedRecently: false
  });
  t.ok(isCool('chokehold'));
  t.ok(isCool('coroner'));
  t.ok(isCool('eric'));
  t.end();
});

test('Test false positives', function testFalsePositives(t) {
  var isCool = createIsCool({
    tragedyHappenedRecently: false
  });

  t.ok(!isCool('IO'));
  t.ok(isCool('iOS'));
  t.ok(!isCool('imo'));
  t.ok(!isCool('IMO'));
  t.end();
});

test('Test using a custom logger', function testCustomLogger(t) {
  var textLogged;
  var isCool = createIsCool({
    logger: {
      log: function customLog(text) {
        textLogged = text;
      }
    },
    customBlacklist: ['angularjs']
  });

  isCool('angularjs');

  t.equal(textLogged, 'Uncool word: angularjs');
  t.end();
});

test('Test whitelist', function testWhitelist(t) {
  var isCool = createIsCool();

  t.ok(!isCool('crip'));
  t.ok(isCool('JavaScript'));
  t.end();
});

test('Test whitelist', function testWhitelist(t) {
  var isCool = createIsCool({
    customWhitelist: ['gnarly', "bitchin'"]
  });

  t.ok(!isCool('bitch'));
  t.ok(isCool("bitchin'"));
  t.end();
});
