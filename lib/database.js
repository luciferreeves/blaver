/**
 *
 * @namespace bluffmaster.database
 */
var Database = function (bluffmaster) {
  var self = this;
  /**
   * column
   *
   * @method bluffmaster.database.column
   */
  self.column = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.database.column);
  };

  self.column.schema = {
    "description": "Generates a column name.",
    "sampleResults": ["id", "title", "createdAt"]
  };

  /**
   * type
   *
   * @method bluffmaster.database.type
   */
  self.type = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.database.type);
  };

  self.type.schema = {
    "description": "Generates a column type.",
    "sampleResults": ["byte", "int", "varchar", "timestamp"]
  };

  /**
   * collation
   *
   * @method bluffmaster.database.collation
   */
  self.collation = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.database.collation);
  };

  self.collation.schema = {
    "description": "Generates a collation.",
    "sampleResults": ["utf8_unicode_ci", "utf8_bin"]
  };

  /**
   * engine
   *
   * @method bluffmaster.database.engine
   */
  self.engine = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.database.engine);
  };

  self.engine.schema = {
    "description": "Generates a storage engine.",
    "sampleResults": ["MyISAM", "InnoDB"]
  };
};

module["exports"] = Database;
