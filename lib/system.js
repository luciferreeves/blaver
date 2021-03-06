// generates fake data for many computer systems properties

var commonFileTypes = ["video", "audio", "image", "text", "application"];

var commonMimeTypes = [
  "application/pdf",
  "audio/mpeg",
  "audio/wav",
  "image/png",
  "image/jpeg",
  "image/gif",
  "video/mp4",
  "video/mpeg",
  "text/html",
];

function setToArray(set) {
  // shortcut if Array.from is available
  if (Array.from) {
    return Array.from(set);
  }

  var array = [];
  set.forEach(function (item) {
    array.push(item);
  });
  return array;
}

/**
 *
 * @namespace blaver.system
 */
function System(blaver) {
  /**
   * generates a file name
   *
   * @method blaver.system.fileName
   */
  this.fileName = function () {
    var str = blaver.random.words();
    str =
      str.toLowerCase().replace(/\W/g, "_") +
      "." +
      blaver.system.fileExt();
    return str;
  };

  /**
   * commonFileName
   *
   * @method blaver.system.commonFileName
   * @param {string} ext
   */
  this.commonFileName = function (ext) {
    var str = blaver.random.words();
    str = str.toLowerCase().replace(/\W/g, "_");
    str += "." + (ext || blaver.system.commonFileExt());
    return str;
  };

  /**
   * mimeType
   *
   * @method blaver.system.mimeType
   */
  this.mimeType = function () {
    var typeSet = new Set();
    var extensionSet = new Set();
    var mimeTypes = blaver.definitions.system.mimeTypes;

    Object.keys(mimeTypes).forEach(function (m) {
      var type = m.split("/")[0];

      typeSet.add(type);

      if (mimeTypes[m].extensions instanceof Array) {
        mimeTypes[m].extensions.forEach(function (ext) {
          extensionSet.add(ext);
        });
      }
    });

    var types = setToArray(typeSet);
    var extensions = setToArray(extensionSet);
    var mimeTypeKeys = Object.keys(blaver.definitions.system.mimeTypes);

    return blaver.random.arrayElement(mimeTypeKeys);
  };

  /**
   * returns a commonly used file type
   *
   * @method blaver.system.commonFileType
   */
  this.commonFileType = function () {
    return blaver.random.arrayElement(commonFileTypes);
  };

  /**
   * returns a commonly used file extension
   *
   * @method blaver.system.commonFileExt
   */
  this.commonFileExt = function () {
    return blaver.system.fileExt(
      blaver.random.arrayElement(commonMimeTypes)
    );
  };

  /**
   * returns any file type available as mime-type
   *
   * @method blaver.system.fileType
   */
  this.fileType = function () {
    var typeSet = new Set();
    var extensionSet = new Set();
    var mimeTypes = blaver.definitions.system.mimeTypes;

    Object.keys(mimeTypes).forEach(function (m) {
      var type = m.split("/")[0];

      typeSet.add(type);

      if (mimeTypes[m].extensions instanceof Array) {
        mimeTypes[m].extensions.forEach(function (ext) {
          extensionSet.add(ext);
        });
      }
    });

    var types = setToArray(typeSet);
    var extensions = setToArray(extensionSet);
    var mimeTypeKeys = Object.keys(blaver.definitions.system.mimeTypes);
    return blaver.random.arrayElement(types);
  };

  /**
   * fileExt
   *
   * @method blaver.system.fileExt
   * @param {string} mimeType
   */
  this.fileExt = function (mimeType) {
    var typeSet = new Set();
    var extensionSet = new Set();
    var mimeTypes = blaver.definitions.system.mimeTypes;

    Object.keys(mimeTypes).forEach(function (m) {
      var type = m.split("/")[0];

      typeSet.add(type);

      if (mimeTypes[m].extensions instanceof Array) {
        mimeTypes[m].extensions.forEach(function (ext) {
          extensionSet.add(ext);
        });
      }
    });

    var types = setToArray(typeSet);
    var extensions = setToArray(extensionSet);
    var mimeTypeKeys = Object.keys(blaver.definitions.system.mimeTypes);

    if (mimeType) {
      var mimes = blaver.definitions.system.mimeTypes;
      return blaver.random.arrayElement(mimes[mimeType].extensions);
    }

    return blaver.random.arrayElement(extensions);
  };

  /**
   * returns directory path
   *
   * @method blaver.system.directoryPath
   */
  this.directoryPath = function () {
    var paths = blaver.definitions.system.directoryPaths;
    return blaver.random.arrayElement(paths);
  };

  /**
   * returns file path
   *
   * @method blaver.system.filePath
   */
  this.filePath = function () {
    return blaver.fake(
      "{{system.directoryPath}}/{{system.fileName}}.{{system.fileExt}}"
    );
  };

  /**
   * semver
   *
   * @method blaver.system.semver
   */
  this.semver = function () {
    return [
      blaver.datatype.number(9),
      blaver.datatype.number(9),
      blaver.datatype.number(9),
    ].join(".");
  };
}

module["exports"] = System;
