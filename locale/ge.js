var BluffMaster = require("../lib");
var bluffmaster = new BluffMaster({ locale: "ge", localeFallback: "en" });
bluffmaster.locales["ge"] = require("../lib/locales/ge");
bluffmaster.locales["en"] = require("../lib/locales/en");
module["exports"] = bluffmaster;
