var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "zh_CN", localeFallback: "en" });
bluffmaster.locales["zh_CN"] = require("../lib/locales/zh_CN");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
