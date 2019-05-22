var restify = require('restify');
var builder = require('botbuilder');
var config = require('./config/constants');
var fs = require('fs');
var logger = require('./utils/logger');
var intents = require('./intents/index');
var login = require('./intents/login');
var nointent = require('./intents/nointent');
var callservice = require('./intents/callservice');
var pending = require('./intents/pending');
var removed = require('./intents/removed');
var welcome = require('./intents/welcome');
var nplStart = require('./intents/nlpStart');
var other = require('./intents/other_query');
var azure = require('botbuilder-azure'); 
var server = restify.createServer();

var documentDbOptions = {
    host: 'https://fs-altran-bot-cosmos-db.documents.azure.com:443/', 
    masterKey: 'ey9NYsxuyxyuKccECptueaFDUQNXLleNWKkuT3R1TdrwI70CLUK9Z3Ts98qgdSYgM95TrILwytwXFQE09jnmKQ==', 
    database: 'botdocs',   
    collection: 'botdata'
};

var docDbClient = new azure.DocumentDbClient(documentDbOptions);

var cosmosStorage = new azure.AzureBotStorage({ gzipData: false }, docDbClient);

//Config bot
var settingsOfBot = config.bot;
var connector = new builder.ChatConnector(settingsOfBot);
var bot = new builder.UniversalBot(connector, {
  persistConversationData: true
}).set('storage', cosmosStorage);

//Define dialogs
bot.dialog('/', intents.get());
welcome.initDialog(bot);
login.initDialog(bot);
callservice.initDialog(bot);
nplStart.initDialog(bot);
pending.initDialog(bot);
removed.initDialog(bot);
nointent.initDialog(bot);
other.initDialog(bot);

bot.use({
  receive: function (event, next) {
    logger.info('user: ' + event.text)
    next();
  }
});

server.get(/.*/, restify.serveStatic(config.server));
server.post('/api/messages', connector.listen());
server.listen(config.port, function () {
  logger.debug('%s listening to %s', server.name, server.url);
});
