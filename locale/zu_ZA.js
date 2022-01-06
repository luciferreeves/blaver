var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'zu_ZA', localeFallback: 'en' });
bluffmaster.locales['zu_ZA'] = require('../lib/locales/zu_ZA');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
