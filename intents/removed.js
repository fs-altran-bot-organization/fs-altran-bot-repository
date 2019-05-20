const builder = require('botbuilder');
const utils = require('../utils/utils');
const config = require('../config/constants');
const literals = require('../literals/literals.js');

module.exports.initDialog = function initDialog(bot) {


  bot.dialog('removed', [

    function (session) {
      builder.Prompts.text(session, literals.getLabel('removed_state'));
    },
    function (session, results, next) {
      if (results.response) {
        var text_user = results.response;
        builder.LuisRecognizer.recognize(text_user, config.luis.url, function (err, intents, entities) {
          var intent = utils.match(intents);
          if (intent && intent.intent) {
            switch (intent.intent) {
              case 'removedIntent':
                session.send(literals.getLabel('request_removed1'));
                session.beginDialog('other_query');
                break;
              default:
                session.send(literals.getLabel('request_removed'));
                session.beginDialog('other_query');
                break;
            }
          }
        });
      }
    },

  ]).triggerAction({
    matches: 'removed'
  });
};