var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'en_NG', localeFallback: 'en' });
bluffmaster.locales['en_NG'] = require('../lib/locales/en_NG');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
