var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "pt_BR", localeFallback: "en" });
bluffmaster.locales["pt_BR"] = require("../lib/locales/pt_BR");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
