var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'id_ID', localeFallback: 'en' });
bluffmaster.locales['id_ID'] = require('../lib/locales/id_ID');
bluffmaster.locales['en'] = require('../lib/locales/en');
module['exports'] = bluffmaster;
