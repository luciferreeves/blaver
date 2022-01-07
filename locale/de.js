var Blaver = require("../lib");
var blaver = new Blaver({ locale: "de", localeFallback: "en" });
blaver.locales["de"] = require("../lib/locales/de");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
