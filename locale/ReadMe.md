# Read Me

The files in this directory have been auto-generated from the `gulpfile`.

These file exist in order to allow users to require the `blaver` library using a specific locale ( instead of the default behavior or loading all locales ).

Example:

``` js
var blaver = require('../locale/en');
console.log(blaver.name.findName());
```