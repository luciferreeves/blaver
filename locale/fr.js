const Blaver = require("../lib");
const blaver = new Blavercale({ locale: "fr", localeFallback: "en" });
blaver.locales["fr"] = require("../lib/locales/fr");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
