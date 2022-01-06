var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "sk", localeFallback: "en" });
bluffmaster.locales["sk"] = require("../lib/locales/sk");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
