var Blaver = require("../lib");
var blaver = new Blavercale({ locale: "en_US", localeFallback: "en" });
blaver.locales["en_US"] = require("../lib/locales/en_US");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
