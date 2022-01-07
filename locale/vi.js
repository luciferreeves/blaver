const Blaver = require("../lib");
const blaver = new Blaver({ locale: "vi", localeFallback: "en" });
blaver.locales["vi"] = require("../lib/locales/vi");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
