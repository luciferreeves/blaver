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

            assert.equal(column, 'title');
            bluffmaster.database.column.restore();
        });
    });

    describe("collation()", function () {
        it("returns a collation", function () {
            sinon.stub(bluffmaster.database, 'collation').returns('utf8_bin');
            var collation = bluffmaster.database.collation();

            assert.equal(collation, 'utf8_bin');
            bluffmaster.database.collation.restore();
        });
    });

    describe("engine()", function () {
        it("returns an engine", function () {
            sinon.stub(bluffmaster.database, 'engine').returns('InnoDB');
            var engine = bluffmaster.database.engine();

            assert.equal(engine, 'InnoDB');
            bluffmaster.database.engine.restore();
        });
    });

    describe("type()", function () {
        it("returns a column type", function () {
            sinon.stub(bluffmaster.database, 'type').returns('int');
            var type = bluffmaster.database.type();

            assert.equal(type, 'int');
            bluffmaster.database.type.restore();
        });
    });
});
