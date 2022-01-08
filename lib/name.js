/**
 * @namespace blaver.name
 */
function Name(blaver) {

  /**
   * firstName
   *
   * @method firstName
   * @param {mixed} gender
   * @memberof blaver.name
   */
  this.firstName = function (gender) {
    let localGender = gender;

    if (
      typeof blaver.definitions.name.male_first_name !== "undefined" &&
      typeof blaver.definitions.name.female_first_name !== "undefined"
    ) {
      
      // some locale datasets ( like ru ) have first_name split by gender. since the name.first_name field does not exist in these datasets,
      // we must randomly pick a name from either gender array so blaver.name.firstName will return the correct locale data ( and not fallback )

      if (typeof localGender === "string") {
        if (localGender.toLowerCase() === "male") {
          localGender = 0;
        } else if (localGender.toLowerCase() === "female") {
          localGender = 1;
        }
      }

      if (typeof localGender !== "number") {
        if (typeof blaver.definitions.name.first_name === "undefined") {
          localGender = blaver.datatype.number(1);
        } else {
          //Fall back to non-gendered names if they exist and gender wasn't specified
          return blaver.random.arrayElement(
            blaver.definitions.name.first_name
          );
        }
      }
      if (localGender === 0) {
        return blaver.random.arrayElement(
          blaver.definitions.name.male_first_name
        );
      } else {
        return blaver.random.arrayElement(
          blaver.definitions.name.female_first_name
        );
      }
    }
    
    return blaver.random.arrayElement(blaver.definitions.name.first_name);
  };

  /**
   * lastName
   *
   * @method lastName
   * @param {mixed} gender
   * @memberof blaver.name
   */
  this.lastName = function (gender) {
    let localGender = gender;

    if (
      typeof blaver.definitions.name.male_last_name !== "undefined" &&
      typeof blaver.definitions.name.female_last_name !== "undefined"
    ) {
      // some locale datasets ( like ru ) have last_name split by gender. i have no idea how last names can have genders, but also i do not speak russian
      // see above comment of firstName method
      if (typeof localGender !== "number") {
        localGender = blaver.datatype.number(1);
      }
      if (localGender === 0) {
        return blaver.random.arrayElement(
          blaver.locales[blaver.locale].name.male_last_name
        );
      } else {
        return blaver.random.arrayElement(
          blaver.locales[blaver.locale].name.female_last_name
        );
      }
    }
    
    return blaver.random.arrayElement(blaver.definitions.name.last_name);
  };

  /**
   * middleName
   *
   * @method middleName
   * @param {mixed} gender
   * @memberof blaver.name
   */
  this.middleName = function (gender) {
    let localGender = gender;

    if (
      typeof blaver.definitions.name.male_middle_name !== "undefined" &&
      typeof blaver.definitions.name.female_middle_name !== "undefined"
    ) {
      if (typeof localGender !== "number") {
        localGender = blaver.datatype.number(1);
      }
      if (localGender === 0) {
        return blaver.random.arrayElement(
          blaver.locales[blaver.locale].name.male_middle_name
        );
      } else {
        return blaver.random.arrayElement(
          blaver.locales[blaver.locale].name.female_middle_name
        );
      }
    }
    
    return blaver.random.arrayElement(blaver.definitions.name.middle_name);
  };

  /**
   * findName
   *
   * @method findName
   * @param {string} firstName
   * @param {string} lastName
   * @param {mixed} gender
   * @memberof blaver.name
   */
  this.findName = function (firstName, lastName, gender) {
    const localFirstName = firstName || blaver.name.firstName(gender);
    const localLastName = lastName || blaver.name.lastName(gender);
    let localGender = gender;
    const r = blaver.datatype.number(8);
    let prefix, suffix;
    // in particular locales first and last names split by gender,
    // thus we keep consistency by passing 0 as male and 1 as female
    if (typeof localGender !== "number") {
      localGender = blaver.datatype.number(1);
    }
    
    switch (r) {
      case 0:
        prefix = blaver.name.prefix(localGender);
        if (prefix) {
          return prefix + " " + localFirstName + " " + localLastName;
        }
      case 1:
        suffix = blaver.name.suffix(localGender);
        if (suffix) {
          return `${localFirstName} ${localLastName} ${suffix}`;
        }
    }

    return `${localFirstName} ${localLastName}`;
  };

  /**
   * jobTitle
   *
   * @method jobTitle
   * @memberof blaver.name
   */
  this.jobTitle = function () {
    return `${blaver.name.jobDescriptor()} ${blaver.name.jobArea()} ${blaver.name.jobType()}`;
  };

  /**
   * gender
   *
   * @method gender
   * @memberof blaver.name
   */
  this.gender = function (binary) {
    if (binary) {
      return blaver.random.arrayElement(
        blaver.definitions.name.binary_gender
      );
    } else {
      return blaver.random.arrayElement(blaver.definitions.name.gender);
    }
  };

  /**
   * prefix
   *
   * @method prefix
   * @param {mixed} gender
   * @memberof blaver.name
   */
  this.prefix = function (gender) {
    let localGender = gender;
    if (
      typeof blaver.definitions.name.male_prefix !== "undefined" &&
      typeof blaver.definitions.name.female_prefix !== "undefined"
    ) {
      if (typeof localGender !== "number") {
        localGender = blaver.datatype.number(1);
      }
      if (localGender === 0) {
        return blaver.random.arrayElement(
          blaver.locales[blaver.locale].name.male_prefix
        );
      } else {
        return blaver.random.arrayElement(
          blaver.locales[blaver.locale].name.female_prefix
        );
      }
    }
    
    return blaver.random.arrayElement(blaver.definitions.name.prefix);
  };

  /**
   * suffix
   *
   * @method suffix
   * @memberof blaver.name
   */
  this.suffix = function () {
    return blaver.random.arrayElement(blaver.definitions.name.suffix);
  };

  /**
   * title
   *
   * @method title
   * @memberof blaver.name
   */
  this.title = function () {
    const descriptor = blaver.random.arrayElement(blaver.definitions.name.title.descriptor);
    const level = blaver.random.arrayElement(blaver.definitions.name.title.level);
    const job = blaver.random.arrayElement(blaver.definitions.name.title.job);

    return `${descriptor} ${level} ${job}`;
  };

  /**
   * jobDescriptor
   *
   * @method jobDescriptor
   * @memberof blaver.name
   */
  this.jobDescriptor = function () {
    return blaver.random.arrayElement(blaver.definitions.name.title.descriptor);
  };

  /**
   * jobArea
   *
   * @method jobArea
   * @memberof blaver.name
   */
  this.jobArea = function () {
    return blaver.random.arrayElement(blaver.definitions.name.title.level);
  };

  /**
   * jobType
   *
   * @method jobType
   * @memberof blaver.name
   */
  this.jobType = function () {
    return blaver.random.arrayElement(blaver.definitions.name.title.job);
  };
}

module.exports = Name;
