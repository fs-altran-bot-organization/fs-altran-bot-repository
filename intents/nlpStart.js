const builder = require('botbuilder');
const utils = require('../utils/utils');
const config = require('../config/constants');
const literals = require('../literals/literals.js');

module.exports.initDialog = function initDialog(bot) {


  bot.dialog('nlpStart', [
    function (session) {
      var policy = session.conversationData.policy;
      var cause = policy.causa;
      var state = policy.estado;
      var requested_credit = policy.creditoSolicitado;
      var granted_credit = policy.creditoConcedido;
      session.send(literals.sprintf('info_state_policy',[policy.codigoPoliza, state, requested_credit, granted_credit, cause]));
      builder.Prompts.text(session, literals.getLabel('info_state_question'));
    },

    function (session, results, next) {
      if (results.response) {
        var text = results.response;
        builder.LuisRecognizer.recognize(text, config.luis.url, function (err, intents, entities) {
          var intent = utils.match(intents);
          if (intent && intent.intent) {
            switch (intent.intent) {
              case 'allOkIntent':
                session.endDialog(literals.getLabel('finOk'));
                break;
              case 'moreInfoIntent':
                session.beginDialog('moreInfo');
                break;
              default:
                session.beginDialog(literals.getLabel('nointent'));
                break;
            }
          }
        });
      }
    }
  ]).triggerAction({
    matches: 'nlpStart'
  });

  bot.dialog('moreInfo', [
    function (session) {
      var policy_select = session.conversationData.policy;
      var cause = policy_select.causa;
      var listCause = config.list.listCause;
      switch (cause) {
        case listCause[0]:
          session.beginDialog('fin_elevator');
          break;
        case listCause[1]:
          session.beginDialog('fin_situation');
          break;
        case listCause[2]:
          session.beginDialog('fin_confidencial');
          break;
        case listCause[3]:
          session.beginDialog('fin_otras');
          break;
        default:
          session.endDialog(literals.getLabel('nointent'));
          break;
      }
    },
  ]).triggerAction({
    matches: 'moreInfo'
  });

  bot.dialog('fin_elevator', [
    function (session) {
      session.send(literals.getLabel('response1'));
      session.beginDialog('other_query');
    }
  ]).triggerAction({
    matches: 'fin_elevator'
  });

  bot.dialog('fin_situation', [
    function (session) {
      session.send(literals.getLabel('response2'));
      session.beginDialog('other_query');
    }
  ]).triggerAction({
    matches: 'fin_situation'
  });

  bot.dialog('fin_confidencial', [
    function (session) {
      session.send(literals.getLabel('response3'));
      session.beginDialog('other_query');
    }
  ]).triggerAction({
    matches: 'fin_confidencial'
  });

  bot.dialog('fin_otras', [
    function (session) {
      session.send(literals.getLabel('response4'));
      session.beginDialog('other_query');
    }
  ]).triggerAction({
    matches: 'fin_otras'
  });
};