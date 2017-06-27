'use strict';

var angular = require('angular');
var service = require('../local-storage');

describe('sidebar.localStorage', () => {
  var fakeWindow;

  before(() =>
    angular.module('h', [])
      .service('localStorage', service)
  );

  context('when accessing localStorage throws an Error', () => {
    it('returns the fallback implementation', () => {
      var badWindow = {};
      var fakeWindow = {};

      Object.defineProperty(badWindow, 'localStorage', {
        get: () => {
          throw Error('denied');
        },
      });

      var prototypes = [badWindow, fakeWindow]
          .map(service)
          .map(Object.getPrototypeOf)
      ;
      assert.strictEqual(prototypes[0], prototypes[1]);
    });
  });

  context('when browser localStorage is *not* accessible', () => {
    var localStorage = null;
    var key = null;

    beforeEach(() => {
      angular.mock.module('h', {
        $window: {
          localStorage: {},
        },
      });
    });

    beforeEach(angular.mock.inject((_localStorage_) => {
      localStorage = _localStorage_;
      key = 'test.memory.key';
    }));

    it('sets/gets Item', () => {
      var value = 'What shall we do with a drunken sailor?';
      localStorage.setItem(key, value);
      var actual = localStorage.getItem(key);
      assert.equal(value, actual);
    });

    it('removes item', () => {
      localStorage.setItem(key, '');
      localStorage.removeItem(key);
      var result = localStorage.getItem(key);
      assert.isNull(result);
    });

    it('sets/gets Object', () => {
      var data = {'foo': 'bar'};
      localStorage.setObject(key, data);
      var stringified = localStorage.getItem(key);
      assert.equal(stringified, JSON.stringify(data));

      var actual = localStorage.getObject(key);
      assert.deepEqual(actual, data);
    });
  });

  context('when browser localStorage is accessible', () => {
    var localStorage;

    beforeEach(() => {
      fakeWindow = {
        localStorage: {
          getItem: sinon.stub(),
          setItem: sinon.stub(),
          removeItem: sinon.stub(),
        },
      };

      angular.mock.module('h', {
        $window: fakeWindow,
      });
    });

    beforeEach(() => {
      angular.mock.inject(_localStorage_ => localStorage = _localStorage_);
    });

    it('uses window.localStorage functions to handle data', () => {
      var key = 'test.storage.key';
      var data = 'test data';

      localStorage.setItem(key, data);
      assert.calledWith(fakeWindow.localStorage.setItem, key, data);
    });
  });
});
