var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'af_ZA', localeFallback: 'en' });
bluffmaster.locales['af_ZA'] = require('../lib/locales/af_ZA');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
