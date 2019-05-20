const builder = require('botbuilder');
const utils = require('../utils/utils');
const config = require('../config/constants');
const literals = require('../literals/literals.js');
var service = require('../utils/service');
var logger = require('../utils/logger');

module.exports.initDialog = function initDialog(bot) {

  bot.dialog('welcome', [
    function(session, args, next){
      session.send(literals.getLabel('salute'));
      if(!session.conversationData.user && !session.conversationData.pass){
        session.beginDialog('login');
      }else{
        session.beginDialog('management');
      }
     
    }
  ]).triggerAction({
    matches: 'welcome'
  });

  bot.dialog('management',[
    function(session, args, next){
      if(!session.conversationData.user && !session.conversationData.pass){
        session.beginDialog('login');
      }else{
        next();
      }
    },
    function (session) {
      var options = [
        literals.getLabel('option1'), 
        literals.getLabel('option2'), 
        literals.getLabel('option3'), 
        literals.getLabel('option4'), 
        literals.getLabel('option5'), 
        literals.getLabel('option6'), 
        literals.getLabel('option7')
      ];

      builder.Prompts.choice(session, literals.getLabel('init_choice'), options,{
        listStyle: builder.ListStyle.button
      });
    },

    function (session, results, next) {
      if (results.response) {
        var idSelect = results.response.index;
        switch (idSelect) {
          case 0:
            session.beginDialog('request_status');
            break;
          case 1:
            session.beginDialog('request_information');
            break;
          case 2:
            session.beginDialog('annex_classification');
            break;
          case 3:
            session.beginDialog('new_request');
            break;
          case 4:
            session.beginDialog('expand');
            break;
          case 5:
            session.beginDialog('modification');
            break;
          case 6:
            session.beginDialog('toCorrect');
            break;
          default:
            session.endDialog(labels.getLabel('first_error_dialog'));
            break;
        }
      }
    }
  ]).triggerAction({
    matches: 'management'
  });


  bot.dialog('request_status', [
    function (session) {
      session.beginDialog('callservice');
    }
  ]).triggerAction({
    matches: 'request_status'
  });

  bot.dialog('request_information', [
    function (session) {
      session.beginDialog('callservice');
    }
  ]).triggerAction({
    matches: 'request_information'
  });


  // Init dialog without an annex
  bot.dialog('annex_classification', [

    // Aks debtor code
    function (session, args) {
      builder.Prompts.text(session, literals.getLabel('ask_debtor_cod'));
    },

    
    function debtor_cod(session, results, next) {
      if (results.response) session.conversationData.debtor_cod = results.response;
      else session.endDialog(literals.getLabel('error_response'));
      next();
    },


    // Ask police code
    function ask_pilice(session, args) {
      builder.Prompts.text(session, literals.getLabel('ask_poliza_cod'));
    },

    //TODO I don´t know if the "remintentes" is the same with "nombres"
    function dpolicy_cod(session, results, next) {
      if (results.response) {
        var policy_cod = results.response;
        session.conversationData.policy_cod = policy_cod;
        var debtor_cod = session.conversationData.debtor_cod;
        // Call service validation code
        service.validCode(debtor_cod, policy_cod, function (err, response) {
          if (err){
            session.endDialog(literals.getLabel('error_server'));
          }else{
            var valid = (response) ? response : false;
            if(valid){
              session.send(literals.getLabel('valid_code'));
              session.beginDialog('other_query');
            }else{
              session.send(literals.getLabel('valid_code_error'));
              session.beginDialog('other_query');
            }
          }
        });
      }
    }
  ]).triggerAction({
    matches: 'annex_classification'
  });

  // Init dialog new request 
  bot.dialog('new_request', [
    function (session, arg) {
      session.send(literals.getLabel('response_option4'));
      session.beginDialog('other_query');
    }
  ]).triggerAction({
    matches: 'new_request'
  });

  // Init dialog expand policy
  bot.dialog('expand', [
    function (session) {
      session.send(literals.getLabel('response_option5'));
      session.beginDialog('other_query');
    }
  ]).triggerAction({
    matches: 'expand'
  });

  // Init dialog modification debtor data
  bot.dialog('modification', [
    function (session) {
      session.send(literals.getLabel('response_option6'));
      session.beginDialog('other_query');
    }
  ]).triggerAction({
    matches: 'modification'
  });

  // Init dialog correct policy
  bot.dialog('toCorrect', [
    function (session) {
      session.send(literals.getLabel('response_option7'));
      session.beginDialog('other_query');
    }
  ]).triggerAction({
    matches: 'toCorrect'
  });
};