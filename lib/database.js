/**
 *
 * @namespace blaver.database
 */
const Database = function (blaver) {
  const self = this;
  /**
   * column
   *
   * @method blaver.database.column
   */
  self.column = function () {
    return blaver.random.arrayElement(
      blaver.definitions.database.column
    );
  };

  self.column.schema = {
    description: "Generates a column name.",
    sampleResults: ["id", "title", "createdAt"],
  };

  /**
   * type
   *
   * @method blaver.database.type
   */
  self.type = function () {
    return blaver.random.arrayElement(
      blaver.definitions.database.type
    );
  };

  self.type.schema = {
    description: "Generates a column type.",
    sampleResults: ["byte", "int", "varchar", "timestamp"],
  };

  /**
   * collation
   *
   * @method blaver.database.collation
   */
  self.collation = function () {
    return blaver.random.arrayElement(
      blaver.definitions.database.collation
    );
  };

  self.collation.schema = {
    description: "Generates a collation.",
    sampleResults: ["utf8_unicode_ci", "utf8_bin"],
  };

  /**
   * engine
   *
   * @method blaver.database.engine
   */
  self.engine = function () {
    return blaver.random.arrayElement(
      blaver.definitions.database.engine
    );
  };

  self.engine.schema = {
    description: "Generates a storage engine.",
    sampleResults: ["MyISAM", "InnoDB"],
  };
};

module.exports = Database;
