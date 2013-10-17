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

  var scopes, binds;

  scopes = [];

  binds = {};

  return {

    /**
     * @param {(String|Array)} key
     * @param {String} [scope=*]
     * @param {Function} handler
     */
    on: function on(key, scope, handler) {
      if (handler === undefined) {
        handler = scope;
        scope = '*';
      }
      if (typeof key === 'string' && key) {
        binds[scope] = binds[scope] || {};
        binds[scope][key] = handler;

      } else if (Array.isArray(key)) {
        key.forEach(function (k) {
          on(k, handler);
        });
      }
    },

    /**
     *
     * @param {(Array|String)} [scope] specify for set, omit for get
     * @returns {Array} of current scopes (get) or previous (set)
     */
    scopes: function (scope) {
      if (scope === undefined) {
        return scopes;
      }
      if (typeof scope === 'string' && scope) {
        scope = [scope];
      }
      if (Array.isArray(scope)) {
        scopes = scope;
        Mousetrap.reset();
      }
      return scopes;
    },

    /**
     * retrieve all bound keys, grouped by scope
     * @returns {Object}
     */
    binds: function () {
      var out;
      out = {};
      Object.keys(binds).forEach(function (scope) {
        out[scope] = Object.keys(binds[scope]);
      });
      return out;
    }

  };
}));
