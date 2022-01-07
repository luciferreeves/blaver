var Blaver = require("../lib");
var blaver = new Blaver({ locale: "ko", localeFallback: "en" });
blaver.locales["ko"] = require("../lib/locales/ko");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
