const Blaver = require("../lib");
const blaver = new Blavercale({ locale: "ru", localeFallback: "en" });
blaver.locales["ru"] = require("../lib/locales/ru");
blaver.locales["en"] = require("../lib/locales/en");
module["exports"] = blaver;
