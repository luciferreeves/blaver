var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'en_AU', localeFallback: 'en' });
bluffmaster.locales['en_AU'] = require('../lib/locales/en_AU');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
