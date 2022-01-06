if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var bluffmaster = require('../index');
}

describe("database.js", function () {
  describe("column()", function () {
    it("returns a column name", function () {
      sinon.stub(bluffmaster.database, 'column').returns('title');
      var column = bluffmaster.database.column();
      var expected = 'title';

      assert.strictEqual(column, expected, "The column name should be equals " + expected + ". Current is " + column);
      bluffmaster.database.column.restore();
    });
  });

  describe("collation()", function () {
    it("returns a collation", function () {
      sinon.stub(bluffmaster.database, 'collation').returns('utf8_bin');
      var collation = bluffmaster.database.collation();
      var expected = 'utf8_bin';

      assert.strictEqual(collation, expected, "The collation should be equals " + expected + ". Current is " + collation);
      bluffmaster.database.collation.restore();
    });
  });

  describe("engine()", function () {
    it("returns an engine", function () {
      sinon.stub(bluffmaster.database, 'engine').returns('InnoDB');
      var engine = bluffmaster.database.engine();
      var expected = 'InnoDB';

      assert.strictEqual(engine, expected, "The db engine should be equals " + expected + ". Current is " + engine);
      bluffmaster.database.engine.restore();
    });
  });

  describe("type()", function () {
    it("returns a column type", function () {
      sinon.stub(bluffmaster.database, 'type').returns('int');
      var type = bluffmaster.database.type();
      var expected = 'int';

      assert.strictEqual(type, expected, "The column type should be equals " + expected + ". Current is " + type);
      bluffmaster.database.type.restore();
    });
  });
});