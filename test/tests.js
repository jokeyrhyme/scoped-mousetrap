/*jslint indent:2, maxlen:80*/
/*global suite, test*/ // mocha
/*global assert*/ // chai
/*global sinon*/ // sinon

/*global Mousetrap, ScopedMousetrap*/

suite('ScopedMousetrap', function () {
  'use strict';

  var smt;
  smt = ScopedMousetrap;

  test('.on()', function () {
    assert.isFunction(smt.on);
  });

  test('.scopes() returns Array', function () {
    assert.isFunction(smt.scopes);
    assert.isArray(smt.scopes());
  });

  test('.scopes("*") returns Array', function () {
    assert.isFunction(smt.scopes);
    assert.isArray(smt.scopes('*'));
  });

  test('.scopes("*") calls Mousetrap.reset()', function () {
    var stub;
    stub = sinon.stub(Mousetrap, 'reset');
    assert.isFunction(smt.scopes);
    assert.isArray(smt.scopes('*'));
    assert(stub.called);
    Mousetrap.reset.restore();
  });
});
