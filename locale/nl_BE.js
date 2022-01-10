const Blaver = require("../lib");
const blaver = new Blaver({ locale: "nl_BE", localeFallback: "nl" });
blaver.locales["nl_BE"] = require("../lib/locales/nl_BE");
blaver.locales["nl"] = require("../lib/locales/nl");
module.exports = blaver;
