const developmentCfg = require('../config/development.json')
const productionCfg = require('../config/production.json')

const environment = process.env.NEXT_PUBLIC_DEPLOY_ENVIRONMENT || 'local';
console.log('environment', environment)
let WEB_CONFIG;

switch (environment) {
  case 'development':
    WEB_CONFIG = developmentCfg;
    break;
  case 'production':
    WEB_CONFIG = productionCfg;
    break;
  default:
    WEB_CONFIG = developmentCfg;
    break;
}

module.exports = {
  WEB_CONFIG,
};