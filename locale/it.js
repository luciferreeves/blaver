var Blaver = require("../lib");
var blaver = new Blavercale({ locale: "it", localeFallback: "en" });
blaver.locales["it"] = require("../lib/locales/it");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
