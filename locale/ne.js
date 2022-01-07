var Blaver = require("../lib");
var blaver = new Blaver({ locale: "ne", localeFallback: "en" });
blaver.locales["ne"] = require("../lib/locales/ne");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
