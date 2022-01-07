var Blaver = require("../lib");
var blaver = new Blaver({ locale: "fr_CA", localeFallback: "en" });
blaver.locales["fr_CA"] = require("../lib/locales/fr_CA");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
