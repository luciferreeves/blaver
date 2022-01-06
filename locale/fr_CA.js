var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'fr_CA', localeFallback: 'en' });
bluffmaster.locales['fr_CA'] = require('../lib/locales/fr_CA');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
