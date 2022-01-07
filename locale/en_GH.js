const Blaver = require("../lib");
const blaver = new Blavercale({ locale: "en_GH", localeFallback: "en" });
blaver.locales["en_GH"] = require("../lib/locales/en_GH");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
