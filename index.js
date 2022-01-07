// since we are requiring the top level of blaver, load all locales by default
var Blaver = require("./lib");
var blaver = new Blaver({ locales: require("./lib/locales") });
module["exports"] = blaver;
