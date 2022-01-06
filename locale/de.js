var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'de', localeFallback: 'en' });
bluffmaster.locales['de'] = require('../lib/locales/de');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
