/*

   this task will generate the Readme.md file found in the project root

*/

const { src, dest } = require("gulp");
const mustache = require("gulp-mustache");
const rename = require("gulp-rename");

module.exports = function readme(cb) {
  var API = "",
    LOCALES = "";
  var bluffmaster = require("../../index");

  // generate locale list
  for (var locale in bluffmaster.locales) {
    LOCALES += " * " + locale + "\n";
  }

  var keys = Object.keys(bluffmaster);
  keys = keys.sort();

  // generate nice tree of api for docs
  keys.forEach(function (module) {
    // ignore certain properties
    var ignore = ["locale", "localeFallback", "definitions", "locales"];
    if (ignore.indexOf(module) !== -1) {
      return;
    }
    API += "* " + module + "\n";
    for (var method in bluffmaster[module]) {
      API += "  * " + method + "\n";
    }
  });

  return src("build/src/docs.md")
    .pipe(
      mustache({
        API: API,
        LOCALES: LOCALES,
        startYear: 2010,
        currentYear: new Date().getFullYear(),
      })
    )
    .pipe(rename("../Readme.md"))
    .pipe(dest("build/"));
};
