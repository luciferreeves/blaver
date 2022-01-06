var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'en_US', localeFallback: 'en' });
bluffmaster.locales['en_US'] = require('../lib/locales/en_US');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
