var BluffMaster = require('../lib');
var bluffmaster = new BluffMaster({ locale: 'nl_BE', localeFallback: 'nl' });
bluffmaster.locales['nl_BE'] = require('../lib/locales/nl_BE');
bluffmaster.locales['nl'] = require('../lib/locales/nl');
module['exports'] = bluffmaster;
