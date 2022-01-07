var Blaver = require("../lib");
var blaver = new Blaver({ locale: "az", localeFallback: "en" });
blaver.locales["az"] = require("../lib/locales/az");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
