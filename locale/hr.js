var Blaver = require("../lib");
var blaver = new Blavercale({ locale: "hr", localeFallback: "en" });
blaver.locales["hr"] = require("../lib/locales/hr");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
