const fs = require("fs");

const methods = {
  walk: function (dir, validation_function, cb) {
    let localCb = cb;
    let local_validation_function = cb;
    if (arguments.length === 2) {
      localCb = validation_function;
      local_validation_function = null;
    }

    const results = [];
    fs.readdir(dir, function (err, list) {
      if (err) {
        return localCb(err);
      }

      let pending = list.length;

      if (!pending) {
        return localCb(null, results);
      }

      list.forEach(function (file) {
        let localFile = file;
        localFile = dir + "/" + file;
        fs.stat(localFile, function (err, stat) {
          if (stat && stat.isDirectory()) {
            methods.walk(localFile, local_validation_function, function (err, res) {
              results.push(res);
              if (!--pending) {
                localCb(null, results);
              }
            });
          } else {
            if (typeof local_validation_function === "function") {
              if (local_validation_function(localFile)) {
                results.push(localFile);
              }
            } else {
              results.push(localFile);
            }

            if (!--pending) {
              localCb(null, results);
            }
          }
        });
      });
    });
  }
};

module.exports = methods;
