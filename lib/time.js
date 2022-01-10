/**
 *
 * @namespace blaver.time
 */
const _Time = function () {
  /**
   * recent
   *
   * @method blaver.time.recent
   * @param {string} outputType - 'abbr' || 'wide' || 'unix' (default choice)
   */
  this.recent = function (outputType) {
    if (typeof outputType === "undefined") {
      outputType = "unix";
    }

    let date = new Date();
    switch (outputType) {
      case "abbr":
        date = date.toLocaleTimeString();
        break;
      case "wide":
        date = date.toTimeString();
        break;
      case "unix":
        date = date.getTime();
        break;
    }
    return date;
  };

  return this;
};

module.exports = _Time;
