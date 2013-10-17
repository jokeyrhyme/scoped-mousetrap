/*jslint indent:2, maxlen:80*/
/*global define, require*/ // AMD / Require.JS

// UMD pattern from https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['mousetrap'], factory);
  } else {
    // Browser globals (root is window)
    root.ScopedMousetrap = factory(root.Mousetrap);
  }
}(this, function (Mousetrap) {
  'use strict';

  var ScopedMousetrap;

  ScopedMousetrap = {};

  Mousetrap.reset();

  return ScopedMousetrap;
}));
