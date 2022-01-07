var Blaver = require("../lib");
var blaver = new Blaver({ locale: "ja", localeFallback: "en" });
blaver.locales["ja"] = require("../lib/locales/ja");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
