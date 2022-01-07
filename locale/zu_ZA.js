var Blaver = require("../lib");
var blaver = new Blaver({ locale: "zu_ZA", localeFallback: "en" });
blaver.locales["zu_ZA"] = require("../lib/locales/zu_ZA");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
