var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'vi', localeFallback: 'en' });
bluffmaster.locales['vi'] = require('../lib/locales/vi');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
