const Blaver = require("../lib");
const blaver = new Blavercale({ locale: "sk", localeFallback: "en" });
blaver.locales["sk"] = require("../lib/locales/sk");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
