/**
 *
 * @namespace blaver.database
 */
const Database = function (blaver) {
  /**
   * column
   *
   * @method blaver.database.column
   */
  this.column = function () {
    return blaver.random.arrayElement(
      blaver.definitions.database.column
    );
  };

  this.column.schema = {
    description: "Generates a column name.",
    sampleResults: ["id", "title", "createdAt"]
  };

  /**
   * type
   *
   * @method blaver.database.type
   */
  this.type = function () {
    return blaver.random.arrayElement(
      blaver.definitions.database.type
    );
  };

  this.type.schema = {
    description: "Generates a column type.",
    sampleResults: ["byte", "int", "varchar", "timestamp"]
  };

  /**
   * collation
   *
   * @method blaver.database.collation
   */
  this.collation = function () {
    return blaver.random.arrayElement(
      blaver.definitions.database.collation
    );
  };

  this.collation.schema = {
    description: "Generates a collation.",
    sampleResults: ["utf8_unicode_ci", "utf8_bin"]
  };

  /**
   * engine
   *
   * @method blaver.database.engine
   */
  this.engine = function () {
    return blaver.random.arrayElement(
      blaver.definitions.database.engine
    );
  };

  this.engine.schema = {
    description: "Generates a storage engine.",
    sampleResults: ["MyISAM", "InnoDB"]
  };
};

module.exports = Database;
