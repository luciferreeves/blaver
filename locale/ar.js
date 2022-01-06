var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'ar', localeFallback: 'en' });
bluffmaster.locales['ar'] = require('../lib/locales/ar');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
