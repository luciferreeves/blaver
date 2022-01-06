var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'el', localeFallback: 'en' });
bluffmaster.locales['el'] = require('../lib/locales/el');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
