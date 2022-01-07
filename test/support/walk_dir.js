const fs = require("fs");

const methods = {
  walk: function (dir, validation_function, cb) {
    if (arguments.length === 2) {
      cb = validation_function;
      validation_function = null;
    }

    const results = [];
    fs.readdir(dir, function (err, list) {
      if (err) {
        return cb(err);
      }

      const pending = list.length;

      if (!pending) {
        return cb(null, results);
      }

      list.forEach(function (file) {
        file = dir + "/" + file;
        fs.stat(file, function (err, stat) {
          if (stat && stat.isDirectory()) {
            methods.walk(file, validation_function, function (err, res) {
              results = results.concat(res);
              if (!--pending) {
                cb(null, results);
              }
            });
          } else {
            if (typeof validation_function === "function") {
              if (validation_function(file)) {
                results.push(file);
              }
            } else {
              results.push(file);
            }

            if (!--pending) {
              cb(null, results);
            }
          }
        });
      });
    });
  },
};

module.exports = methods;
