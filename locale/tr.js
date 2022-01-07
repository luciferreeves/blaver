var Blaver = require("../lib");
var blaver = new Blavercale({ locale: "tr", localeFallback: "en" });
blaver.locales["tr"] = require("../lib/locales/tr");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
