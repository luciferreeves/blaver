var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'en_GH', localeFallback: 'en' });
bluffmaster.locales['en_GH'] = require('../lib/locales/en_GH');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
