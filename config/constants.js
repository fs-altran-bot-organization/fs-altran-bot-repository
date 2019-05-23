'use strict';

module.exports = {
  server: {
    'directory': '.',
    'default': 'index.html'
  },
  port: 8080,
  bot: {
    appId: "ed493816-5c8e-4f3c-8951-00698dedc8e3",
    appPassword: "=/:d?g1=QZdzsT9?boj-zx>H_6PLv"
  },
  url_api: 'http://localhost:2001/api',

  luis: {
   url: "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/c0a27cfd-cdcb-41e4-9cb7-c48c8d3f898c?subscription-key=4b5a81932f514410b527f8247c398eb6&staging=true&verbose=true&timezoneOffset=0&q=",   
	
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
