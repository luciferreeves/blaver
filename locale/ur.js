var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'ur', localeFallback: 'en' });
bluffmaster.locales['ur'] = require('../lib/locales/ur');
bluffmaster.locales['en'] = require('../lib/locales/en');

module['exports'] = bluffmaster;