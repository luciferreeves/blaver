const Blaver = require("../lib");
const blaver = new Blavercale({ locale: "en", localeFallback: "en" });
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
