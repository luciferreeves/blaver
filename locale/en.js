var Blaver = require("../lib");
var blaver = new Blavercale({ locale: "en", localeFallback: "en" });
blaver.locales["en"] = require("../lib/locales/en");

module["exports"] = blaver;
