/**
 *
 * @namespace bluffmaster.name
 */
function Name (bluffmaster) {

  /**
   * firstName
   *
   * @method firstName
   * @param {mixed} gender
   * @memberof bluffmaster.name
   */
  this.firstName = function (gender) {
    if (typeof bluffmaster.definitions.name.male_first_name !== "undefined" && typeof bluffmaster.definitions.name.female_first_name !== "undefined") {
      // some locale datasets ( like ru ) have first_name split by gender. since the name.first_name field does not exist in these datasets,
      // we must randomly pick a name from either gender array so bluffmaster.name.firstName will return the correct locale data ( and not fallback )

      if(typeof gender === 'string') {
        if(gender.toLowerCase() === 'male') {
          gender = 0;
        }
        else if(gender.toLowerCase() === 'female') {
          gender = 1;
        }
      }

      if (typeof gender !== 'number') {
        if(typeof bluffmaster.definitions.name.first_name === "undefined") {
          gender = bluffmaster.datatype.number(1);
        }
        else {
          //Fall back to non-gendered names if they exist and gender wasn't specified
          return bluffmaster.random.arrayElement(bluffmaster.definitions.name.first_name);
        }
      }
      if (gender === 0) {
        return bluffmaster.random.arrayElement(bluffmaster.definitions.name.male_first_name)
      } else {
        return bluffmaster.random.arrayElement(bluffmaster.definitions.name.female_first_name);
      }
    }
    return bluffmaster.random.arrayElement(bluffmaster.definitions.name.first_name);
  };

  /**
   * lastName
   *
   * @method lastName
   * @param {mixed} gender
   * @memberof bluffmaster.name
   */
  this.lastName = function (gender) {
    if (typeof bluffmaster.definitions.name.male_last_name !== "undefined" && typeof bluffmaster.definitions.name.female_last_name !== "undefined") {
      // some locale datasets ( like ru ) have last_name split by gender. i have no idea how last names can have genders, but also i do not speak russian
      // see above comment of firstName method
      if (typeof gender !== 'number') {
        gender = bluffmaster.datatype.number(1);
      }
      if (gender === 0) {
        return bluffmaster.random.arrayElement(bluffmaster.locales[bluffmaster.locale].name.male_last_name);
      } else {
        return bluffmaster.random.arrayElement(bluffmaster.locales[bluffmaster.locale].name.female_last_name);
      }
    }
    return bluffmaster.random.arrayElement(bluffmaster.definitions.name.last_name);
  };

  /**
   * middleName
   *
   * @method middleName
   * @param {mixed} gender
   * @memberof bluffmaster.name
   */
  this.middleName = function (gender) {
    if (typeof bluffmaster.definitions.name.male_middle_name !== "undefined" && typeof bluffmaster.definitions.name.female_middle_name !== "undefined") {
      if (typeof gender !== 'number') {
        gender = bluffmaster.datatype.number(1);
      }
      if (gender === 0) {
        return bluffmaster.random.arrayElement(bluffmaster.locales[bluffmaster.locale].name.male_middle_name);
      } else {
        return bluffmaster.random.arrayElement(bluffmaster.locales[bluffmaster.locale].name.female_middle_name);
      }
    }
    return bluffmaster.random.arrayElement(bluffmaster.definitions.name.middle_name);
  };

  /**
   * findName
   *
   * @method findName
   * @param {string} firstName
   * @param {string} lastName
   * @param {mixed} gender
   * @memberof bluffmaster.name
   */
  this.findName = function (firstName, lastName, gender) {
    var r = bluffmaster.datatype.number(8);
    var prefix, suffix;
    // in particular locales first and last names split by gender,
    // thus we keep consistency by passing 0 as male and 1 as female
    if (typeof gender !== 'number') {
      gender = bluffmaster.datatype.number(1);
    }
    firstName = firstName || bluffmaster.name.firstName(gender);
    lastName = lastName || bluffmaster.name.lastName(gender);
    switch (r) {
      case 0:
        prefix = bluffmaster.name.prefix(gender);
        if (prefix) {
          return prefix + " " + firstName + " " + lastName;
        }
      case 1:
        suffix = bluffmaster.name.suffix(gender);
        if (suffix) {
          return firstName + " " + lastName + " " + suffix;
        }
    }

    return firstName + " " + lastName;
  };

  /**
   * jobTitle
   *
   * @method jobTitle
   * @memberof bluffmaster.name
   */
  this.jobTitle = function () {
    return  bluffmaster.name.jobDescriptor() + " " +
      bluffmaster.name.jobArea() + " " +
      bluffmaster.name.jobType();
  };

  /**
   * gender
   *
   * @method gender
   * @memberof bluffmaster.name
   */
  this.gender = function (binary) {
    if (binary) {
      return bluffmaster.random.arrayElement(bluffmaster.definitions.name.binary_gender);
    } else {
      return bluffmaster.random.arrayElement(bluffmaster.definitions.name.gender);
    }
  }
  
  /**
   * prefix
   *
   * @method prefix
   * @param {mixed} gender
   * @memberof bluffmaster.name
   */
  this.prefix = function (gender) {
    if (typeof bluffmaster.definitions.name.male_prefix !== "undefined" && typeof bluffmaster.definitions.name.female_prefix !== "undefined") {
      if (typeof gender !== 'number') {
        gender = bluffmaster.datatype.number(1);
      }
      if (gender === 0) {
        return bluffmaster.random.arrayElement(bluffmaster.locales[bluffmaster.locale].name.male_prefix);
      } else {
        return bluffmaster.random.arrayElement(bluffmaster.locales[bluffmaster.locale].name.female_prefix);
      }
    }
    return bluffmaster.random.arrayElement(bluffmaster.definitions.name.prefix);
  };

  /**
   * suffix
   *
   * @method suffix
   * @memberof bluffmaster.name
   */
  this.suffix = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.name.suffix);
  };

  /**
   * title
   *
   * @method title
   * @memberof bluffmaster.name
   */
  this.title = function() {
    var descriptor  = bluffmaster.random.arrayElement(bluffmaster.definitions.name.title.descriptor),
      level       = bluffmaster.random.arrayElement(bluffmaster.definitions.name.title.level),
      job         = bluffmaster.random.arrayElement(bluffmaster.definitions.name.title.job);

    return descriptor + " " + level + " " + job;
  };

  /**
   * jobDescriptor
   *
   * @method jobDescriptor
   * @memberof bluffmaster.name
   */
  this.jobDescriptor = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.name.title.descriptor);
  };

  /**
   * jobArea
   *
   * @method jobArea
   * @memberof bluffmaster.name
   */
  this.jobArea = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.name.title.level);
  };

  /**
   * jobType
   *
   * @method jobType
   * @memberof bluffmaster.name
   */
  this.jobType = function () {
    return bluffmaster.random.arrayElement(bluffmaster.definitions.name.title.job);
  };

}

module['exports'] = Name;
