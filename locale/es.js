var Blaver = require("../lib");
var blaver = new Blavercale({ locale: "es", localeFallback: "en" });
blaver.locales["es"] = require("../lib/locales/es");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
