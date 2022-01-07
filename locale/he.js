const Blaver = require("../lib");
const blaver = new Blavercale({ locale: "he", localeFallback: "en" });
blaver.locales["he"] = require("../lib/locales/he");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
