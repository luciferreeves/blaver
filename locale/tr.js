var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'tr', localeFallback: 'en' });
bluffmaster.locales['tr'] = require('../lib/locales/tr');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
