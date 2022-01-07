const Blaver = require("../lib");
const blaver = new Blaver({ locale: "nl", localeFallback: "en" });
blaver.locales["nl"] = require("../lib/locales/nl");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
