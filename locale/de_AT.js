var Blaver = require("../lib");
var blaver = new Blaver({ locale: "de_AT", localeFallback: "en" });
blaver.locales["de_AT"] = require("../lib/locales/de_AT");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
