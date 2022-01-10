/**
 * @namespace blaver.date
 */
const _Date = function (blaver) {
  /**
   * past
   *
   * @method blaver.date.past
   * @param {number} years
   * @param {date} refDate
   */
  this.past = function (years, refDate) {
    let date = new Date();
    if (typeof refDate !== "undefined") {
      date = new Date(Date.parse(refDate));
    }

    const range = {
      min: 1000,
      max: (years || 1) * 365 * 24 * 3600 * 1000
    };

    let past = date.getTime();
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
  this.future = function (years, refDate) {
    let date = new Date();
    if (typeof refDate !== "undefined") {
      date = new Date(Date.parse(refDate));
    }

    const range = {
      min: 1000,
      max: (years || 1) * 365 * 24 * 3600 * 1000
    };

    let future = date.getTime();
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
  this.between = function (from, to) {
    const fromMilli = Date.parse(from);
    const dateOffset = blaver.datatype.number(Date.parse(to) - fromMilli);

    const newDate = new Date(fromMilli + dateOffset);

    return newDate;
  };

  /**
   * betweens
   *
   * @method blaver.date.between
   * @param {date} from
   * @param {date} to
   */
  this.betweens = function (from, to, num = 3) {
    const newDates = [];
    let fromMilli = Date.parse(from);
    const dateOffset = (Date.parse(to) - fromMilli) / (num + 1);
    let lastDate = from;
    for (let i = 0; i < num; i++) {
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
  this.recent = function (days, refDate) {
    let date = new Date();
    if (typeof refDate !== "undefined") {
      date = new Date(Date.parse(refDate));
    }

    const range = {
      min: 1000,
      max: (days || 1) * 24 * 3600 * 1000
    };

    let future = date.getTime();
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
  this.soon = function (days, refDate) {
    let date = new Date();
    if (typeof refDate !== "undefined") {
      date = new Date(Date.parse(refDate));
    }

    const range = {
      min: 1000,
      max: (days || 1) * 24 * 3600 * 1000
    };

    let future = date.getTime();
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
  this.month = function (options = {}) {
    let localOptions = options;

    let type = "wide";
    if (localOptions.abbr) {
      type = "abbr";
    }
    if (
      localOptions.context &&
      typeof blaver.definitions.date.month[type + "_context"] !==
      "undefined"
    ) {
      type += "_context";
    }

    const source = blaver.definitions.date.month[type];

    return blaver.random.arrayElement(source);
  };

  /**
   * weekday
   *
   * @param {object} options
   * @method blaver.date.weekday
   */
  this.weekday = function (options = {}) {
    let localOptions = options;

    let type = "wide";
    if (localOptions.abbr) {
      type = "abbr";
    }
    if (
      localOptions.context &&
      typeof blaver.definitions.date.weekday[type + "_context"] !== "undefined"
    ) {
      type += "_context";
    }

    const source = blaver.definitions.date.weekday[type];

    return blaver.random.arrayElement(source);
  };

  return this;
};

module.exports = _Date;
