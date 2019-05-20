const builder = require('botbuilder');
const utils = require('../utils/utils');
const config = require('../config/constants');
const literals = require('../literals/literals.js');

module.exports.initDialog = function initDialog(bot) {


  bot.dialog('login', [

    function (session, args, next) {
      session.send(literals.getLabel('login_info'));
      builder.Prompts.text(session, literals.getLabel('login_question_user'));
    },

    function (session, results, next) {
      if (results.response) {
        var user = results.response;
        session.conversationData.user = user;
        builder.Prompts.text(session,literals.sprintf('login_question_password',[user]));
      }else{
        session.endDialog(literals.getLabel('login_error'))
      }
    },

    function (session, results, next) {
      if (results.response) {
        var pass = results.response;
        session.conversationData.pass = pass;
        session.send(literals.getLabel('login_ok'));
        session.beginDialog('management');
      }else{
        session.endDialog(literals.getLabel('login_error'))
      }
    },
  ]).triggerAction({
    matches: 'login'
  });
}