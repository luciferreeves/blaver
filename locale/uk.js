var Blaver = require("../lib");
var blaver = new Blaver({ locale: "uk", localeFallback: "en" });
blaver.locales["uk"] = require("../lib/locales/uk");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
