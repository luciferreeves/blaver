const Blaver = require("../lib");
const blaver = new Blaver({ locale: "zh_CN", localeFallback: "en" });
blaver.locales["zh_CN"] = require("../lib/locales/zh_CN");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
