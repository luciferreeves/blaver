var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'pl', localeFallback: 'en' });
bluffmaster.locales['pl'] = require('../lib/locales/pl');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
