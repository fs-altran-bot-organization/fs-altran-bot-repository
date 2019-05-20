const builder = require('botbuilder');
const literals = require('../literals/literals.js');

module.exports.initDialog = function initDialog(bot) {
  bot.dialog('nointent', [
    function (session, args) {
      session.endDialog(literals.getLabel('nointent'));
    }
  ]).triggerAction({
    matches: 'nointent'
  });
};