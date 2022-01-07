/*

   this task will generate the blaver.js and blaver.min.js browser bundles
   these bundles will contain all blaver.js locales

*/

const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const { src, dest } = require("gulp");

const files = {
  jsMain: "./index.js",
  jsOutput: "blaver.js",
};

module.exports = function browser() {
  return browserify(files.jsMain, {
    standalone: "blaver",
    debug: true,
  })
    .bundle()
    .pipe(source(files.jsOutput))
    .pipe(buffer())
    .pipe(dest("examples/browser/js"))
    .pipe(dest("dist/"))
    .pipe(rename({ extname: ".min.js" }))
    .pipe(uglify())
    .pipe(dest("examples/browser/js"))
    .pipe(dest("dist/"));
};
