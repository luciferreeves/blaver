var Blaver = require("../lib");
var blaver = new Blavercale({ locale: "es_MX", localeFallback: "en" });
blaver.locales["es_MX"] = require("../lib/locales/es_MX");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
