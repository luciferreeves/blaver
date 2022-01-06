var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'en_ZA', localeFallback: 'en' });
bluffmaster.locales['en_ZA'] = require('../lib/locales/en_ZA');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
