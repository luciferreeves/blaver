if (typeof module !== 'undefined') {
  var assert = require('assert');
  var blaver = require('../index');
}

describe("date.js", function () {
  describe("past()", function () {
    it("returns a date N years into the past", function () {

      const date = blaver.date.past(75);
      assert.ok(date < new Date());
    });

    it("returns a past date when N = 0", function () {

      const refDate = new Date();
      const date = blaver.date.past(0, refDate.toJSON());

      assert.ok(date < refDate); // date should be before the date given
    });

    it("returns a date N years before the date given", function () {

      const refDate = new Date(2120, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

      const date = blaver.date.past(75, refDate.toJSON());

      assert.ok(date < refDate && date > new Date()); // date should be before date given but after the current time
    });

  });

  describe("future()", function () {
    it("returns a date N years into the future", function () {

      const date = blaver.date.future(75);

      assert.ok(date > new Date());
    });

    it("returns a future date when N = 0", function () {

      const refDate = new Date();
      const date = blaver.date.future(0, refDate.toJSON());

      assert.ok(date > refDate); // date should be after the date given
    });

    it("returns a date N years after the date given", function () {

      const refDate = new Date(1880, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

      const date = blaver.date.future(75, refDate.toJSON());

      assert.ok(date > refDate && date < new Date()); // date should be after the date given, but before the current time
    });
  });

  describe("recent()", function () {
    it("returns a date N days from the recent past", function () {

      const date = blaver.date.recent(30);

      assert.ok(date <= new Date());
    });

    it("returns a date N days from the recent past, starting from refDate", function () {

      const days = 30;
      const refDate = new Date(2120, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

      const date = blaver.date.recent(days, refDate);

      const lowerBound = new Date(refDate.getTime() - (days * 24 * 60 * 60 * 1000));

      assert.ok(lowerBound <= date, "`recent()` date should not be further back than `n` days ago");
      assert.ok(date <= refDate, "`recent()` date should not be ahead of the starting date reference");
    });

  });

  describe("soon()", function () {
    it("returns a date N days into the future", function () {

      const date = blaver.date.soon(30);

      assert.ok(date >= new Date());
    });

    it("returns a date N days from the recent future, starting from refDate", function () {

      const days = 30;
      const refDate = new Date(1880, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

      const date = blaver.date.soon(days, refDate);

      const upperBound = new Date(refDate.getTime() + (days * 24 * 60 * 60 * 1000));

      assert.ok(date <= upperBound, "`soon()` date should not be further ahead than `n` days ago");
      assert.ok(refDate <= date, "`soon()` date should not be behind the starting date reference");
    });

  });

  describe("between()", function () {
    it("returns a random date between the dates given", function () {

      const from = new Date(1990, 5, 7, 9, 11, 0, 0);
      const to = new Date(2000, 6, 8, 10, 12, 0, 0);

      const date = blaver.date.between(from, to);

      assert.ok(date > from && date < to);
    });
  });

  describe("betweens()", function () {
    it("returns an array of 3 dates ( by default ) of sorted randoms dates between the dates given", function () {

      const from = new Date(1990, 5, 7, 9, 11, 0, 0);
      const to = new Date(2000, 6, 8, 10, 12, 0, 0);

      const dates = blaver.date.betweens(from, to );
            
      assert.ok(dates[0] > from && dates[0] < to);
      assert.ok(dates[1] > dates[0] && dates[2] > dates[1]);
    });
  });

  describe("month()", function () {
    it("returns random value from date.month.wide array by default", function () {
      const month = blaver.date.month();
      assert.ok(blaver.definitions.date.month.wide.indexOf(month) !== -1);
    });

    it("returns random value from date.month.wide_context array for context option", function () {
      const month = blaver.date.month({ context: true });
      assert.ok(blaver.definitions.date.month.wide_context.indexOf(month) !== -1);
    });

    it("returns random value from date.month.abbr array for abbr option", function () {
      const month = blaver.date.month({ abbr: true });
      assert.ok(blaver.definitions.date.month.abbr.indexOf(month) !== -1);
    });

    it("returns random value from date.month.abbr_context array for abbr and context option", function () {
      const month = blaver.date.month({ abbr: true, context: true });
      assert.ok(blaver.definitions.date.month.abbr_context.indexOf(month) !== -1);
    });

    it("returns random value from date.month.wide array for context option when date.month.wide_context array is missing", function () {
      const backup_wide_context = blaver.definitions.date.month.wide_context;
      blaver.definitions.date.month.wide_context = undefined;

      const month = blaver.date.month({ context: true });
      assert.ok(blaver.definitions.date.month.wide.indexOf(month) !== -1);

      blaver.definitions.date.month.wide_context = backup_wide_context;
    });

    it("returns random value from date.month.abbr array for abbr and context option when date.month.abbr_context array is missing", function () {
      const backup_abbr_context = blaver.definitions.date.month.abbr_context;
      blaver.definitions.date.month.abbr_context = undefined;

      const month = blaver.date.month({ abbr: true, context: true });
      assert.ok(blaver.definitions.date.month.abbr.indexOf(month) !== -1);

      blaver.definitions.date.month.abbr_context = backup_abbr_context;
    });
  });

  describe("weekday()", function () {
    it("returns random value from date.weekday.wide array by default", function () {
      const weekday = blaver.date.weekday();
      assert.ok(blaver.definitions.date.weekday.wide.indexOf(weekday) !== -1);
    });

    it("returns random value from date.weekday.wide_context array for context option", function () {
      const weekday = blaver.date.weekday({ context: true });
      assert.ok(blaver.definitions.date.weekday.wide_context.indexOf(weekday) !== -1);
    });

    it("returns random value from date.weekday.abbr array for abbr option", function () {
      const weekday = blaver.date.weekday({ abbr: true });
      assert.ok(blaver.definitions.date.weekday.abbr.indexOf(weekday) !== -1);
    });

    it("returns random value from date.weekday.abbr_context array for abbr and context option", function () {
      const weekday = blaver.date.weekday({ abbr: true, context: true });
      assert.ok(blaver.definitions.date.weekday.abbr_context.indexOf(weekday) !== -1);
    });

    it("returns random value from date.weekday.wide array for context option when date.weekday.wide_context array is missing", function () {
      const backup_wide_context = blaver.definitions.date.weekday.wide_context;
      blaver.definitions.date.weekday.wide_context = undefined;

      const weekday = blaver.date.weekday({ context: true });
      assert.ok(blaver.definitions.date.weekday.wide.indexOf(weekday) !== -1);

      blaver.definitions.date.weekday.wide_context = backup_wide_context;
    });

    it("returns random value from date.weekday.abbr array for abbr and context option when date.weekday.abbr_context array is missing", function () {
      const backup_abbr_context = blaver.definitions.date.weekday.abbr_context;
      blaver.definitions.date.weekday.abbr_context = undefined;

      const weekday = blaver.date.weekday({ abbr: true, context: true });
      assert.ok(blaver.definitions.date.weekday.abbr.indexOf(weekday) !== -1);

      blaver.definitions.date.weekday.abbr_context = backup_abbr_context;
    });
  });

});