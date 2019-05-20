const builder = require('botbuilder');
const utils = require('../utils/utils');
const config = require('../config/constants');
const literals = require('../literals/literals.js');

module.exports.initDialog = function initDialog(bot) {


  bot.dialog('pending', [

    function (session, args, next) {
      var cod_policy = session.conversationData.policy.codigoPoliza;
      var options = [literals.getLabel('pending1'), literals.getLabel('pending2'), literals.getLabel('pending3')];
      builder.Prompts.choice(session, literals.sprintf('pending_state',[cod_policy]), options, {listStyle: builder.ListStyle.button });
    },

    function (session, results) {
      if (results.response) {
        var idSelect = results.response.index;
        switch (idSelect) {
          case 0:
            session.beginDialog('fin_pending');
            break;
          case 1:
            session.beginDialog('fin_pending2');
            break;
          case 2:
            session.beginDialog('serviceCall');
            break;
          default:
            session.endDialog(literals.getLabel('error_pending'));
            break;
        }
      }
    },

  ]).triggerAction({
    matches: 'pending'
  });

  bot.dialog('fin_pending', [
    function (session) {
      session.send(literals.getLabel('res_pending1'));
      session.beginDialog('other_query');
    }
  ]).triggerAction({
    matches: 'fin_pending'
  });
  bot.dialog('fin_pending2', [
    function (session) {
      session.send(literals.getLabel('res_pending2'));
      session.beginDialog('other_query');
    }
  ]).triggerAction({
    matches: 'fin_pending2'
  });

  //TODO get info service
  bot.dialog('serviceCall', [

    function (session, args, next) {
      session.send(literals.getLabel('res_pending3'));
      session.beginDialog('other_query');
    }
  ]).triggerAction({
    matches: 'serviceCall'
  });
};