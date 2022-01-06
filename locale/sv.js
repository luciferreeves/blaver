var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'sv', localeFallback: 'en' });
bluffmaster.locales['sv'] = require('../lib/locales/sv');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
