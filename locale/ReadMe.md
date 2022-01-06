# Read Me

The files in this directory have been auto-generated from the `gulpfile`.

These file exist in order to allow users to require the `bluffmaster` library using a specific locale ( instead of the default behavior or loading all locales ).

Example:

``` js
var bluffmaster = require('../locale/en');
console.log(bluffmaster.name.findName());
```