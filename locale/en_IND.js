var Blaver = require("../lib");
var blaver = new Blavercale({ locale: "en_IND", localeFallback: "en" });
blaver.locales["en_IND"] = require("../lib/locales/en_IND");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
