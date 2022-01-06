var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "pt_PT", localeFallback: "en" });
bluffmaster.locales["pt_PT"] = require("../lib/locales/pt_PT");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
