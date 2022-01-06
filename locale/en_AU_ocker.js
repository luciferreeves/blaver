var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'en_AU_ocker', localeFallback: 'en' });
bluffmaster.locales['en_AU_ocker'] = require('../lib/locales/en_AU_ocker');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
