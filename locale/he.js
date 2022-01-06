var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'he', localeFallback: 'en' });
bluffmaster.locales['he'] = require('../lib/locales/he');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
