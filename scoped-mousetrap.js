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

  var scopes, binds, activeBinds, updateMousetrap;

  scopes = [];

  binds = {};

  activeBinds = [];

  updateMousetrap = function () {
    var s, sLength, key, scope;
    Mousetrap.reset();
    activeBinds = [];
    sLength = scopes.length;
    for (s = 0; s < sLength; s += 1) {
      scope = scopes[s];
      for (key in binds[scope]) {
        if (binds[scope].hasOwnProperty(key)) {
          Mousetrap.bind(key, binds[scope][key]);
          activeBinds.push(key);
        }
      }
    }
  };

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
          on(k, scope, handler);
        });
      }
    },

    /**
     *
     * @param {Array} [scope] specify for set, omit for get
     * @returns {Array} of current scopes (get) or previous (set)
     */
    scopes: function (scope) {
      var original;
      if (scope === undefined) {
        return scopes;
      }
      original = scopes;
      if (typeof scope === 'string' && scope) {
        scopes = [scope];
      }
      if (Array.isArray(scope)) {
        scopes = scope;
      }
      updateMousetrap();
      return original;
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
    },

    /**
     * retrieve only currently-bound keys
     * @returns {Array}
     */
    activeBinds: function () {
      return activeBinds;
    },

    reset: function () {
      scopes = [];
      binds = {};
      updateMousetrap();
    }

  };
}));
