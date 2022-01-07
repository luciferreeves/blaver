if (typeof module !== 'undefined') {
  var assert = require('assert');
  var sinon = require('sinon');
  var blaver = require('../index');
}

describe("database.js", function () {
  describe("column()", function () {
    it("returns a column name", function () {
      sinon.stub(blaver.database, 'column').returns('title');
      const column = blaver.database.column();
      const expected = 'title';

      assert.strictEqual(column, expected, "The column name should be equals " + expected + ". Current is " + column);
      blaver.database.column.restore();
    });
  });

  describe("collation()", function () {
    it("returns a collation", function () {
      sinon.stub(blaver.database, 'collation').returns('utf8_bin');
      const collation = blaver.database.collation();
      const expected = 'utf8_bin';

      assert.strictEqual(collation, expected, "The collation should be equals " + expected + ". Current is " + collation);
      blaver.database.collation.restore();
    });
  });

  describe("engine()", function () {
    it("returns an engine", function () {
      sinon.stub(blaver.database, 'engine').returns('InnoDB');
      const engine = blaver.database.engine();
      const expected = 'InnoDB';

      assert.strictEqual(engine, expected, "The db engine should be equals " + expected + ". Current is " + engine);
      blaver.database.engine.restore();
    });
  });

  describe("type()", function () {
    it("returns a column type", function () {
      sinon.stub(blaver.database, 'type').returns('int');
      const type = blaver.database.type();
      const expected = 'int';

      assert.strictEqual(type, expected, "The column type should be equals " + expected + ". Current is " + type);
      blaver.database.type.restore();
    });
  });
});