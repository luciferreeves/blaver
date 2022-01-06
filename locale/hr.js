var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'hr', localeFallback: 'en' });
bluffmaster.locales['hr'] = require('../lib/locales/hr');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
