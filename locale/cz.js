var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'cz', localeFallback: 'en' });
bluffmaster.locales['cz'] = require('../lib/locales/cz');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
