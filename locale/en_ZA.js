const Blaver = require("../lib");
const blaver = new Blavercale({ locale: "en_ZA", localeFallback: "en" });
blaver.locales["en_ZA"] = require("../lib/locales/en_ZA");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
