/*jslint indent:2, maxlen:80*/
/*global suite, test, setup, teardown*/ // mocha
/*global assert*/ // chai
/*global sinon*/ // sinon

/*global Mousetrap, ScopedMousetrap*/

suite('ScopedMousetrap', function () {
  'use strict';

  var smt, stubReset, stubBind;
  smt = ScopedMousetrap;

  setup(function () {
    stubReset = sinon.stub(Mousetrap, 'reset');
    stubBind = sinon.stub(Mousetrap, 'bind');
  });

  test('.on()', function () {
    assert.isFunction(smt.on);
  });

  test('.scopes() returns Array', function () {
    assert.isFunction(smt.scopes);
    assert.isArray(smt.scopes());
  });

  test('.scopes("*") returns Array', function () {
    assert.isFunction(smt.scopes);
    assert.isArray(smt.scopes(['*']));
  });

  test('.scopes("*") calls Mousetrap.reset()', function () {
    assert.isFunction(smt.scopes);
    assert.isArray(smt.scopes(['*']));
    assert(stubReset.called);
  });

  test('.on() creates scopes', function () {
    smt.on('esc', 'abc', function () {
      return false;
    });
    assert.include(Object.keys(smt.binds()), 'abc');
    assert.include(smt.binds().abc, 'esc');
    smt.on('enter', 'def', function () {
      return false;
    });
    assert.include(Object.keys(smt.binds()), 'abc');
    assert.include(smt.binds().abc, 'esc');
    assert.include(Object.keys(smt.binds()), 'def');
    assert.include(smt.binds().def, 'enter');
    smt.on('enter', 'abc', function () {
      return false;
    });
    assert.include(Object.keys(smt.binds()), 'abc');
    assert.include(smt.binds().abc, 'esc');
    assert.include(smt.binds().abc, 'enter');
    assert.include(Object.keys(smt.binds()), 'def');
    assert.include(smt.binds().def, 'enter');
  });

  test('.on() with Array of keys records each key', function () {
    smt.on(['abc', 'def'], function () {
      return false;
    });
    assert.isArray(Object.keys(smt.binds()));
    assert.lengthOf(Object.keys(smt.binds()), 1);
    assert.isArray(smt.binds()['*']);
    assert.lengthOf(smt.binds()['*'], 2);
    assert.include(smt.binds()['*'], 'abc');
    assert.include(smt.binds()['*'], 'def');
  });

  test('.scope("abc") calls Mousetrap.bind()', function () {
    smt.on('esc', 'abc', function () {
      return false;
    });
    smt.scopes('abc');
    assert(stubBind.called);
  });

  test('.scope(...) establishes keybinds', function () {
    var original;
    smt.on(['a', 'b', 'c', 'd'], 'abcd', function () {
      return false;
    });
    smt.on(['e', 'f'], 'ef', function () {
      return false;
    });
    smt.on('g', 'g', function () {
      return false;
    });
    original = smt.scopes('g');
    assert.lengthOf(smt.activeBinds(), 1);
    assert.lengthOf(smt.binds().g, 1);
    assert.deepEqual(original, []);
    original = smt.scopes('ef');
    assert.lengthOf(smt.activeBinds(), 2);
    assert.lengthOf(smt.binds().ef, 2);
    assert.deepEqual(original, ['g']);
    original = smt.scopes('abcd');
    assert.lengthOf(smt.activeBinds(), 4);
    assert.lengthOf(smt.binds().abcd, 4);
    assert.deepEqual(original, ['ef']);
    original = smt.scopes(['abcd', 'ef']);
    assert.lengthOf(smt.activeBinds(), 6);
    assert.lengthOf(smt.binds().abcd, 4);
    assert.lengthOf(smt.binds().ef, 2);
    assert.deepEqual(original, ['abcd']);
    original = smt.scopes(['abcd', 'ef', 'g']);
    assert.lengthOf(smt.activeBinds(), 7);
    assert.lengthOf(smt.binds().abcd, 4);
    assert.lengthOf(smt.binds().ef, 2);
    assert.lengthOf(smt.binds().g, 1);
    assert.deepEqual(original, ['abcd', 'ef']);
  });

  test('.reset() wipes binds and scopes', function () {
    smt.on('esc', 'abc', function () {
      return false;
    });
    smt.scopes('abc');
    smt.reset();
    assert.isArray(smt.scopes());
    assert.lengthOf(smt.scopes(), 0);
    assert.isArray(Object.keys(smt.binds()));
    assert.lengthOf(Object.keys(smt.binds()), 0);
  });

  teardown(function () {
    Mousetrap.reset.restore();
    Mousetrap.bind.restore();
    smt.reset();
  });
});
