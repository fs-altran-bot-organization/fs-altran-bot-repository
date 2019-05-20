const config = require('../config/constants');
const log4js = require('log4js');
const logger = new log4js.getLogger(config.logger.name);
logger.level = log4js.levels[config.logger.nivel];

module.exports = logger;
