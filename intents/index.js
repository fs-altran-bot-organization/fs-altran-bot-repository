const builder = require('botbuilder');
const config = require('../config/constants');

module.exports.get = function() {
  const recognizer = new builder.LuisRecognizer(config.luis.url);
  const intents = new builder.IntentDialog({
    recognizers: [recognizer],
    intentThreshold: config.luis.minScore
  });

  intents.matches('login', 'login');
  intents.matches('servicecall', 'servicecall');
  intents.matches('management', 'management');
  intents.matches('pending', 'pending');
  intents.matches('removed', 'removed');
  intents.matches('welcome', 'welcome');
  intents.matches('nplStart', 'nplStart');
  intents.matches('allOkIntent', 'allOkIntent');
  intents.matches('removedIntent', 'removedIntent');
  intents.matches('moreInfoIntent', 'moreInfoIntent');
  intents.matches('other_query', 'other_query');
  intents.onDefault('nointent');

  return intents;
};