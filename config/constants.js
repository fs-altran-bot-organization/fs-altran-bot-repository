'use strict';

module.exports = {
  server: {
    'directory': '.',
    'default': 'index.html'
  },
  port: 8000,
  bot: {
    appId: "96d018ea-e909-4072-bbc3-85117a3c2cd3",
    appPassword: ";Ztd::pD&IaVsmly.K2H7+b]suvg-"
  },
  url_api: 'http://localhost:2001/api',

  luis: {
   url: "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/c0a27cfd-cdcb-41e4-9cb7-c48c8d3f898c?verbose=true&timezoneOffset=-360&subscription-key=4b5a81932f514410b527f8247c398eb6&q=",   
	
	minScore: 0.7
  },
  logger:{
    name:'BotSolunion',
    nivel:'DEBUG'
  },
  list: {
    listState: ['PENDIENTE', 'REVISION', 'COMPLETO', 'LIMITADO', 'REDUCIDO', 'EXCLUIDO', 'CANCELADO', 'ELIMINADO'],
    listCause: ['El cupon solicitado es elevado', 'La solicitud financiera de la empresa', 'confidencial o riesgo general', 'otras causas']

  }
}
