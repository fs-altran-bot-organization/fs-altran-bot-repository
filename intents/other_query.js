const builder = require('botbuilder');
const utils = require('../utils/utils');
const config = require('../config/constants');
const literals = require('../literals/literals.js');

module.exports.initDialog = function initDialog(bot) {

  bot.dialog('other_query', [
    function (session, args, next) {
      builder.Prompts.choice(session, literals.getLabel('other_query'), ['SI', 'NO'], {listStyle: builder.ListStyle.button });
    },

    function (session, results) {
      if (results.response) {
        var idSelect = results.response.index;
        switch (idSelect) {
          case 0://SI
            session.beginDialog('management');
            break;
          case 1://NO
            session.endDialog(literals.getLabel('the_end_text'));
            break;
        }
      }
    }
  ]).triggerAction({
    matches: 'other_query'
  });
}