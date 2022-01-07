var Blaver = require("../lib");
var blaver = new Blavercale({ locale: "en_GB", localeFallback: "en" });
blaver.locales["en_GB"] = require("../lib/locales/en_GB");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
