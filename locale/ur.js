var Blaver = require('../lib');
var blaver = new Blaver({ locale: 'ur', localeFallback: 'en' });
blaver.locales['ur'] = require('../lib/locales/ur');
blaver.locales['en'] = require('../lib/locales/en');

module['exports'] = blaver;