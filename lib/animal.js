/**
 *
 * @namespace blaver.animal
 */
const Animal = function (blaver) {
  const self = this;

  /**
   * dog
   *
   * @method blaver.animal.dog
   */
  self.dog = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.dog);
  };
  /**
   * cat
   *
   * @method blaver.animal.cat
   */
  self.cat = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.cat);
  };
  /**
   * snake
   *
   * @method blaver.animal.snake
   */
  self.snake = function () {
    return blaver.random.arrayElement(
      blaver.definitions.animal.snake
    );
  };
  /**
   * bear
   *
   * @method blaver.animal.bear
   */
  self.bear = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.bear);
  };
  /**
   * lion
   *
   * @method blaver.animal.lion
   */
  self.lion = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.lion);
  };
  /**
   * cetacean
   *
   * @method blaver.animal.cetacean
   */
  self.cetacean = function () {
    return blaver.random.arrayElement(
      blaver.definitions.animal.cetacean
    );
  };
  /**
   * horse
   *
   * @method blaver.animal.horse
   */
  self.horse = function () {
    return blaver.random.arrayElement(
      blaver.definitions.animal.horse
    );
  };
  /**
   * bird
   *
   * @method blaver.animal.bird
   */
  self.bird = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.bird);
  };
  /**
   * cow
   *
   * @method blaver.animal.cow
   */
  self.cow = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.cow);
  };
  /**
   * fish
   *
   * @method blaver.animal.fish
   */
  self.fish = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.fish);
  };
  /**
   * crocodilia
   *
   * @method blaver.animal.crocodilia
   */
  self.crocodilia = function () {
    return blaver.random.arrayElement(
      blaver.definitions.animal.crocodilia
    );
  };
  /**
   * insect
   *
   * @method blaver.animal.insect
   */
  self.insect = function () {
    return blaver.random.arrayElement(
      blaver.definitions.animal.insect
    );
  };
  /**
   * rabbit
   *
   * @method blaver.animal.rabbit
   */
  self.rabbit = function () {
    return blaver.random.arrayElement(
      blaver.definitions.animal.rabbit
    );
  };
  /**
   * type
   *
   * @method blaver.animal.type
   */
  self.type = function () {
    return blaver.random.arrayElement(blaver.definitions.animal.type);
  };

  return self;
};

module["exports"] = Animal;
