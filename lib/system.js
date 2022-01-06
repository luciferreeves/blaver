// generates fake data for many computer systems properties

var commonFileTypes = [
  "video",
  "audio",
  "image",
  "text",
  "application"
];

var commonMimeTypes = [
  "application/pdf",
  "audio/mpeg",
  "audio/wav",
  "image/png",
  "image/jpeg",
  "image/gif",
  "video/mp4",
  "video/mpeg",
  "text/html"
];

function setToArray(set) {
  // shortcut if Array.from is available
  if (Array.from) { return Array.from(set); }

  var array = [];
  set.forEach(function (item) {
    array.push(item);
  });
  return array;
}

/**
 *
 * @namespace bluffmaster.system
 */
function System(bluffmaster) {

  /**
   * generates a file name
   *
   * @method bluffmaster.system.fileName
   */
  this.fileName = function () {
    var str = bluffmaster.random.words(); 
    str = str
          .toLowerCase()
          .replace(/\W/g, "_") + "." + bluffmaster.system.fileExt();;
    return str;
  };

  /**
   * commonFileName
   *
   * @method bluffmaster.system.commonFileName
   * @param {string} ext
   */
  this.commonFileName = function (ext) {
    var str = bluffmaster.random.words();
    str = str
          .toLowerCase()
          .replace(/\W/g, "_");
    str += "." + (ext || bluffmaster.system.commonFileExt());
    return str;
  };

  /**
   * mimeType
   *
   * @method bluffmaster.system.mimeType
   */
  this.mimeType = function () {
    var typeSet = new Set();
    var extensionSet = new Set();
    var mimeTypes = bluffmaster.definitions.system.mimeTypes;

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
    var mimeTypeKeys = Object.keys(bluffmaster.definitions.system.mimeTypes);

    return bluffmaster.random.arrayElement(mimeTypeKeys);
  };

  /**
   * returns a commonly used file type
   *
   * @method bluffmaster.system.commonFileType
   */
  this.commonFileType = function () {
    return bluffmaster.random.arrayElement(commonFileTypes);
  };

  /**
   * returns a commonly used file extension
   *
   * @method bluffmaster.system.commonFileExt
   */
  this.commonFileExt = function () {
    return bluffmaster.system.fileExt(bluffmaster.random.arrayElement(commonMimeTypes));
  };


  /**
   * returns any file type available as mime-type
   *
   * @method bluffmaster.system.fileType
   */
  this.fileType = function () {
    var typeSet = new Set();
    var extensionSet = new Set();
    var mimeTypes = bluffmaster.definitions.system.mimeTypes;

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
    var mimeTypeKeys = Object.keys(bluffmaster.definitions.system.mimeTypes);
    return bluffmaster.random.arrayElement(types);

  };

  /**
   * fileExt
   *
   * @method bluffmaster.system.fileExt
   * @param {string} mimeType
   */
  this.fileExt = function (mimeType) {
    var typeSet = new Set();
    var extensionSet = new Set();
    var mimeTypes = bluffmaster.definitions.system.mimeTypes;

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
    var mimeTypeKeys = Object.keys(bluffmaster.definitions.system.mimeTypes);

    if (mimeType) {
      var mimes = bluffmaster.definitions.system.mimeTypes;
      return bluffmaster.random.arrayElement(mimes[mimeType].extensions);
    }

    return bluffmaster.random.arrayElement(extensions);
  };

  /**
   * returns directory path
   *
   * @method bluffmaster.system.directoryPath
   */
  this.directoryPath = function () {
    var paths = bluffmaster.definitions.system.directoryPaths
    return bluffmaster.random.arrayElement(paths);
  };

  /**
   * returns file path
   *
   * @method bluffmaster.system.filePath
   */
  this.filePath = function () {
    return bluffmaster.fake("{{system.directoryPath}}/{{system.fileName}}.{{system.fileExt}}");
  };

  /**
   * semver
   *
   * @method bluffmaster.system.semver
   */
  this.semver = function () {
    return [bluffmaster.datatype.number(9),
      bluffmaster.datatype.number(9),
      bluffmaster.datatype.number(9)].join('.');
  }

}

module['exports'] = System;
