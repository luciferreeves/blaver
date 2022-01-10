/**
 *
 * @namespace blaver.animal
 */
const Animal = function (blaver) {
  /**
   * dog
   *
   * @method blaver.animal.dog
   */
  this.dog = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.dog);
  };
  /**
   * cat
   *
   * @method blaver.animal.cat
   */
  this.cat = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.cat);
  };
  /**
   * snake
   *
   * @method blaver.animal.snake
   */
  this.snake = function () {
    return blaver.random.arrayElement(
      blaver.definitions.animal.snake
    );
  };
  /**
   * bear
   *
   * @method blaver.animal.bear
   */
  this.bear = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.bear);
  };
  /**
   * lion
   *
   * @method blaver.animal.lion
   */
  this.lion = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.lion);
  };
  /**
   * cetacean
   *
   * @method blaver.animal.cetacean
   */
  this.cetacean = function () {
    return blaver.random.arrayElement(
      blaver.definitions.animal.cetacean
    );
  };
  /**
   * horse
   *
   * @method blaver.animal.horse
   */
  this.horse = function () {
    return blaver.random.arrayElement(
      blaver.definitions.animal.horse
    );
  };
  /**
   * bird
   *
   * @method blaver.animal.bird
   */
  this.bird = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.bird);
  };
  /**
   * cow
   *
   * @method blaver.animal.cow
   */
  this.cow = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.cow);
  };
  /**
   * fish
   *
   * @method blaver.animal.fish
   */
  this.fish = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.fish);
  };
  /**
   * crocodilia
   *
   * @method blaver.animal.crocodilia
   */
  this.crocodilia = function () {
    return blaver.random.arrayElement(
      blaver.definitions.animal.crocodilia
    );
  };
  /**
   * insect
   *
   * @method blaver.animal.insect
   */
  this.insect = function () {
    return blaver.random.arrayElement(
      blaver.definitions.animal.insect
    );
  };
  /**
   * rabbit
   *
   * @method blaver.animal.rabbit
   */
  this.rabbit = function () {
    return blaver.random.arrayElement(
      blaver.definitions.animal.rabbit
    );
  };
  /**
   * type
   *
   * @method blaver.animal.type
   */
  this.type = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.type);
  };

  return this;
};

module.exports = Animal;
