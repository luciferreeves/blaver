var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'en_IE', localeFallback: 'en' });
bluffmaster.locales['en_IE'] = require('../lib/locales/en_IE');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
