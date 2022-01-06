var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'es', localeFallback: 'en' });
bluffmaster.locales['es'] = require('../lib/locales/es');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
