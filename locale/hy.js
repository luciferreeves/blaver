const Blaver = require("../lib");
const blaver = new Blavercale({ locale: "hy", localeFallback: "en" });
blaver.locales["hy"] = require("../lib/locales/hy");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
