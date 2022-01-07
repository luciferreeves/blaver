var Blaver = require("../lib");
var blaver = new Blaver({ locale: "nb_NO", localeFallback: "en" });
blaver.locales["nb_NO"] = require("../lib/locales/nb_NO");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
