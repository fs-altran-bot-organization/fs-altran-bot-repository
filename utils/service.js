const config = require('../config/constants');
var axios = require('axios');
var logger = require('./logger');


// Call external services
module.exports.getPolicies = function getPolicies(cod, callback) {
  axios.get(config.url_api + '/policies/' + cod)
    .then(function (response) {
      logger.debug('Los datos se han recogido y enviado correctamente.');
      callback(null, response.data);
    }).catch(function (error) {
      logger.debug('Se ha producido un error al recoger los datos.');
      callback(error);
    });
};

module.exports.validCode = function validCode(debtor_cod, policy_cod, callback) {
  axios.get(config.url_api + '/validCode/' + debtor_cod+ '/' + policy_cod)
    .then(function (response) {
      logger.debug('Los datos se han recogido y enviado correctamente.');
      callback(null, response.data);
    }).catch(function (error) {
      logger.debug('Se ha producido un error al recoger los datos.');
      callback(error);
    });
};
