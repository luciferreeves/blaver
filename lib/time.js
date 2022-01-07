/**
 *
 * @namespace blaver.time
 */
const _Time = function (blaver) {
  const self = this;

  /**
   * recent
   *
   * @method blaver.time.recent
   * @param {string} outputType - 'abbr' || 'wide' || 'unix' (default choice)
   */
  self.recent = function (outputType) {
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

  return self;
};

module.exports = _Time;
