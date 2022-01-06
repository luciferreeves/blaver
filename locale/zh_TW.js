var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "zh_TW", localeFallback: "en" });
bluffmaster.locales["zh_TW"] = require("../lib/locales/zh_TW");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
