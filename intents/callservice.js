const builder = require('botbuilder');
const utils = require('../utils/utils');
const config = require('../config/constants');
const literals = require('../literals/literals.js');
var service = require('../utils/service');
var logger = require('../utils/logger');

module.exports.initDialog = function initDialog(bot) {

  bot.dialog('callservice', [
    function (session, args) {
      builder.Prompts.text(session, literals.getLabel('ask_debtor_cod'));
    },
    function (session, results, next) {
      //we catch the answer of the user
      if (results.response) {
        var cod = results.response;
        //we passed the debtor_cod
        session.conversationData.cod = cod;
        // call service (con axios) with debor_cod
        service.getPolicies(cod, function (err, response) {
          // var policies = response;
          if (err){ 
            session.endDialog(literals.getLabel('error_server'));
          } else{
            var policies = (response) ? response : [];
            //if the policies array length is 0 we have a case1
            if (policies.length == 0) {
              session.beginDialog('no_found');
              //if the policies array length is 1 we have a case2
            } else if (policies.length == 1) {
              session.conversationData.policy = policies[0];
              session.beginDialog('one');
              //if the policies array length is >=2 we have a case3
            } else if (policies.length >= 2) {
              session.conversationData.policies_list = policies;
              var cod_list = [];
              for (i in policies) {
                //add the codes of the policies to array
                cod_list.push(policies[i].codigoPoliza);
              }
              session.conversationData.cod_list = cod_list;
              session.beginDialog('many_policies');
            } else {
              session.endDialog(literals.getLabel('error_getPolicies'));
            }
          }
        });
      }
    }
  ]).triggerAction({
    matches: 'callservice'
  });

  bot.dialog('no_found', [
    function (session) {
      session.endDialog(literals.getLabel('no_found_res'));
    }
  ]).triggerAction({
    matches: 'no_found'
  });

  bot.dialog('many_policies', [
    function (session, args, next) {
      var cod_list = session.conversationData.cod_list;
      var options = cod_list;
      builder.Prompts.choice(session, literals.getLabel('choise_policy'), options, { listStyle: builder.ListStyle.button });
    },
    function (session, results, next) {
      if (results.response) {
        var policies = session.conversationData.policies_list;
        var cod_policy = results.response.entity;
        var policy_select;
        // through the policies to get the date from the selected policy
        for (let i = 0; i < policies.length; i++) {
          const policy = policies[i];
          if (policy.codigoPoliza === cod_policy) {
            policy_select = policy;
          }
        }
        //save the selected policy in session
        session.conversationData.policy = policy_select;
        session.beginDialog('one')
      } else {
        session.endDialog(literals.getLabel('error_policy'));
      }
    }
  ]).triggerAction({
    matches: 'many_policies'
  });

  bot.dialog('one', [

    function getState(session, next) {
      var policy = session.conversationData.policy;
      var state = policy.estado;
      var listState = config.list.listState;
      switch (state) {
        case listState[0]://pending
          session.beginDialog('pending');
          break;
        case listState[1]://in review
          session.beginDialog('pending');
          break;
        case listState[2]://complete
          session.beginDialog('complete');
          break;
        case listState[3]://limited
          session.beginDialog('nlpStart');
          break;
        case listState[4]://reduced
          session.beginDialog('nlpStart');
          break;
        case listState[5]://excluded
          session.beginDialog('excluded');
          break;
        case listState[6]://canceled
          session.beginDialog('excluded');
          break;
        case listState[7]://removed
          session.beginDialog('removed');
          break;
        default:
          session.endDialog(literals.getLabel('state_error'));
          break;
      }
    },
  ]).triggerAction({
    matches: 'one'
  });

  bot.dialog('complete', [
    function (session) {
      var policy = session.conversationData.policy;
      var state = policy.estado;
      var granted_credit = policy.creditoConcedido;
      session.send(literals.sprintf('complete_state_info',[policy.codigoPoliza, state, granted_credit]));
      session.send(literals.getLabel('complete_state'));
      session.beginDialog('other_query');
    }
  ]).triggerAction({
    matches: 'complete'
  });

  //i´m not sure if the "cobertura perdida" is the granted_credit
  bot.dialog('excluded', [
    function (session) {
      var policy = session.conversationData.policy;
      var cause = policy.causa;
      var state = policy.estado;
      var granted_credit = policy.creditoConcedido;
      session.send(literals.sprintf('finOk_info',[policy.codigoPoliza, state, granted_credit, cause]));  
      session.send(text + literals.getLabel('finOk'));
      session.beginDialog('other_query');
    }
  ]).triggerAction({
    matches: 'excluded'
  });
};