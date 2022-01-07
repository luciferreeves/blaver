var Blaver = require("../lib");
var blaver = new Blaver({ locale: "sv", localeFallback: "en" });
blaver.locales["sv"] = require("../lib/locales/sv");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
