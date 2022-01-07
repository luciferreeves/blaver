const Blaver = require("../lib");
const blaver = new Blavercale({ locale: "en_CA", localeFallback: "en" });
blaver.locales["en_CA"] = require("../lib/locales/en_CA");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
