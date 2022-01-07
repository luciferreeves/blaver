/**
 *
 * @namespace blaver.date
 */
var _Date = function (blaver) {
  var self = this;
  /**
   * past
   *
   * @method blaver.date.past
   * @param {number} years
   * @param {date} refDate
   */
  self.past = function (years, refDate) {
    var date = new Date();
    if (typeof refDate !== "undefined") {
      date = new Date(Date.parse(refDate));
    }

    var range = {
      min: 1000,
      max: (years || 1) * 365 * 24 * 3600 * 1000,
    };

    var past = date.getTime();
    past -= blaver.datatype.number(range); // some time from now to N years ago, in milliseconds
    date.setTime(past);

    return date;
  };

  /**
   * future
   *
   * @method blaver.date.future
   * @param {number} years
   * @param {date} refDate
   */
  self.future = function (years, refDate) {
    var date = new Date();
    if (typeof refDate !== "undefined") {
      date = new Date(Date.parse(refDate));
    }

    var range = {
      min: 1000,
      max: (years || 1) * 365 * 24 * 3600 * 1000,
    };

    var future = date.getTime();
    future += blaver.datatype.number(range); // some time from now to N years later, in milliseconds
    date.setTime(future);

    return date;
  };

  /**
   * between
   *
   * @method blaver.date.between
   * @param {date} from
   * @param {date} to
   */
  self.between = function (from, to) {
    var fromMilli = Date.parse(from);
    var dateOffset = blaver.datatype.number(Date.parse(to) - fromMilli);

    var newDate = new Date(fromMilli + dateOffset);

    return newDate;
  };

  /**
   * betweens
   *
   * @method blaver.date.between
   * @param {date} from
   * @param {date} to
   */
  self.betweens = function (from, to, num) {
    if (typeof num == "undefined") {
      num = 3;
    }
    var newDates = [];
    var fromMilli = Date.parse(from);
    var dateOffset = (Date.parse(to) - fromMilli) / (num + 1);
    var lastDate = from;
    for (var i = 0; i < num; i++) {
      fromMilli = Date.parse(lastDate);
      lastDate = new Date(fromMilli + dateOffset);
      newDates.push(lastDate);
    }
    return newDates;
  };

  /**
   * recent
   *
   * @method blaver.date.recent
   * @param {number} days
   * @param {date} refDate
   */
  self.recent = function (days, refDate) {
    var date = new Date();
    if (typeof refDate !== "undefined") {
      date = new Date(Date.parse(refDate));
    }

    var range = {
      min: 1000,
      max: (days || 1) * 24 * 3600 * 1000,
    };

    var future = date.getTime();
    future -= blaver.datatype.number(range); // some time from now to N days ago, in milliseconds
    date.setTime(future);

    return date;
  };

  /**
   * soon
   *
   * @method blaver.date.soon
   * @param {number} days
   * @param {date} refDate
   */
  self.soon = function (days, refDate) {
    var date = new Date();
    if (typeof refDate !== "undefined") {
      date = new Date(Date.parse(refDate));
    }

    var range = {
      min: 1000,
      max: (days || 1) * 24 * 3600 * 1000,
    };

    var future = date.getTime();
    future += blaver.datatype.number(range); // some time from now to N days later, in milliseconds
    date.setTime(future);

    return date;
  };

  /**
   * month
   *
   * @method blaver.date.month
   * @param {object} options
   */
  self.month = function (options) {
    options = options || {};

    var type = "wide";
    if (options.abbr) {
      type = "abbr";
    }
    if (
      options.context &&
      typeof blaver.definitions.date.month[type + "_context"] !==
        "undefined"
    ) {
      type += "_context";
    }

    var source = blaver.definitions.date.month[type];

    return blaver.random.arrayElement(source);
  };

  /**
   * weekday
   *
   * @param {object} options
   * @method blaver.date.weekday
   */
  self.weekday = function (options) {
    options = options || {};

    var type = "wide";
    if (options.abbr) {
      type = "abbr";
    }
    if (
      options.context &&
      typeof blaver.definitions.date.weekday[type + "_context"] !==
        "undefined"
    ) {
      type += "_context";
    }

    var source = blaver.definitions.date.weekday[type];

    return blaver.random.arrayElement(source);
  };

  return self;
};

module["exports"] = _Date;
