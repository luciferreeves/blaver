var Blaver = require("../lib");
var blaver = new Blaver({ locale: "zh_TW", localeFallback: "en" });
blaver.locales["zh_TW"] = require("../lib/locales/zh_TW");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
