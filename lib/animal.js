/**
 *
 * @namespace bluffmaster.animal
 */
var Animal = function (bluffmaster) {
  var self = this;

  /**
   * dog
   *
   * @method bluffmaster.animal.dog
   */
  self.dog = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.animal.dog);
  };
  /**
   * cat
   *
   * @method bluffmaster.animal.cat
   */
  self.cat = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.animal.cat);
  };
  /**
   * snake  
   *
   * @method bluffmaster.animal.snake
   */
  self.snake = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.animal.snake);
  };
  /**
   * bear  
   *
   * @method bluffmaster.animal.bear
   */
  self.bear = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.animal.bear);
  };
  /**
   * lion  
   *
   * @method bluffmaster.animal.lion
   */
  self.lion = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.animal.lion);
  };
  /**
   * cetacean  
   *
   * @method bluffmaster.animal.cetacean
   */
  self.cetacean = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.animal.cetacean);
  };
  /**
   * horse 
   *
   * @method bluffmaster.animal.horse
   */
  self.horse = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.animal.horse);
  };
  /**
   * bird
   *
   * @method bluffmaster.animal.bird
   */
  self.bird = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.animal.bird);
  };
  /**
   * cow 
   *
   * @method bluffmaster.animal.cow
   */
  self.cow = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.animal.cow);
  };
  /**
   * fish
   *
   * @method bluffmaster.animal.fish
   */
  self.fish = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.animal.fish);
  };
  /**
   * crocodilia
   *
   * @method bluffmaster.animal.crocodilia
   */
  self.crocodilia = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.animal.crocodilia);
  };
  /**
   * insect  
   *
   * @method bluffmaster.animal.insect
   */
  self.insect = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.animal.insect);
  };
  /**
   * rabbit 
   *
   * @method bluffmaster.animal.rabbit
   */
  self.rabbit = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.animal.rabbit);
  };
  /**
   * type 
   *
   * @method bluffmaster.animal.type
   */
  self.type = function() {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.animal.type);
  };

  return self;
};

module['exports'] = Animal;
