var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'en_CA', localeFallback: 'en' });
bluffmaster.locales['en_CA'] = require('../lib/locales/en_CA');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
