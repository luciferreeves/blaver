if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

describe("database.js", function () {
  describe("column()", function () {
    it("returns a column name", function () {
      sinon.stub(blaver.database, 'column').returns('title');
      var column = blaver.database.column();
      var expected = 'title';

      assert.strictEqual(column, expected, "The column name should be equals " + expected + ". Current is " + column);
      blaver.database.column.restore();
    });
  });

  describe("collation()", function () {
    it("returns a collation", function () {
      sinon.stub(blaver.database, 'collation').returns('utf8_bin');
      var collation = blaver.database.collation();
      var expected = 'utf8_bin';

      assert.strictEqual(collation, expected, "The collation should be equals " + expected + ". Current is " + collation);
      blaver.database.collation.restore();
    });
  });

  describe("engine()", function () {
    it("returns an engine", function () {
      sinon.stub(blaver.database, 'engine').returns('InnoDB');
      var engine = blaver.database.engine();
      var expected = 'InnoDB';

      assert.strictEqual(engine, expected, "The db engine should be equals " + expected + ". Current is " + engine);
      blaver.database.engine.restore();
    });
  });

  describe("type()", function () {
    it("returns a column type", function () {
      sinon.stub(blaver.database, 'type').returns('int');
      var type = blaver.database.type();
      var expected = 'int';

      assert.strictEqual(type, expected, "The column type should be equals " + expected + ". Current is " + type);
      blaver.database.type.restore();
    });
  });
});