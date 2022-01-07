var Blaver = require("../lib");
var blaver = new Blaver({ locale: "el", localeFallback: "en" });
blaver.locales["el"] = require("../lib/locales/el");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
