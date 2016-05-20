var assert = require('assert');
var nodeWeixinSettings = require('../lib');
var nodeWeixinSettings1 = require('../lib');
var async = require('async');

describe('node-weixin-settings', function () {
  it('should be equal before !', function () {
    assert.equal(true, nodeWeixinSettings === nodeWeixinSettings1);
  });

  it('should get what is set!', function (done) {
    var set = {
      state: 'STATE',
      scope: 0
    };
    async.series([
      function (cb) {
        nodeWeixinSettings.set(1, 'oauth', set, function () {
          cb(null);
        });
      },
      function (cb) {
        nodeWeixinSettings.get(1, 'oauth', function (data) {
          assert.deepEqual(set, data);
          cb(null);
        });
      },
      function (cb) {
        nodeWeixinSettings.get(1, 'oauth1', function (data) {
          assert.equal(true, data === null);
          cb(null);
        });
      },
      function (cb) {
        nodeWeixinSettings.all(1, function (data) {
          assert.equal(true, data.oauth === set);
          cb(null);
        });
      },
      function (cb) {
        nodeWeixinSettings.all(2, function (data) {
          assert.equal(true, data.oauth === undefined);
          cb(null);
        });
      }
    ], function () {
      done();
    });
  });

  it('should register get, set!', function (done) {
    var insideGet = false;
    var insideSet = false;
    var insideAll = false;
    var sessionConf = {};
    var set = {
      state: 'STATE',
      scope: 0
    };

    function MyGet(id, key, cb) {
      insideGet = true;
      if (sessionConf[id] && sessionConf[id][key]) {
        cb(sessionConf[id][key]);
        return;
      }
      cb(null);
    }

    function MySet(id, key, value, cb) {
      insideSet = true;
      if (!sessionConf[id]) {
        sessionConf[id] = {};
      }
      sessionConf[id][key] = value;
      cb();
    }

    function MyAll(id, cb) {
      insideAll = true;
      if (!sessionConf[id]) {
        sessionConf[id] = {};
      }
      cb(sessionConf[id]);
    }

    async.series([
      function (cb) {
        assert.equal(true, nodeWeixinSettings.registerSet(MySet));

        nodeWeixinSettings.set(1, 'oauth', set, function () {
          assert.equal(true, insideSet);
          cb(null);
        });
      },
      function (cb) {
        assert.equal(true, nodeWeixinSettings.registerGet(MyGet));
        nodeWeixinSettings.get(1, 'oauth', function (oauth) {
          assert.equal(true, insideGet);
          assert.deepEqual(set, oauth);
          cb();
        });
      },
      function (cb) {
        assert.equal(true, nodeWeixinSettings.registerAll(MyAll));
        nodeWeixinSettings.all(1, function () {
          assert.equal(true, insideAll);
          cb();
        });
      }
    ], function () {
      assert.equal(false, nodeWeixinSettings.registerGet('MyGet'));
      assert.equal(false, nodeWeixinSettings.registerSet('MySet'));
      assert.equal(false, nodeWeixinSettings.registerAll('MyAll'));
      done();
    });
  });

  it('should be equal after!', function () {
    assert.equal(true, nodeWeixinSettings === nodeWeixinSettings1);
  });

  it('should be sessionizable', function () {
    assert.equal(true, nodeWeixinSettings === nodeWeixinSettings.sessionizable({}, {}));
  });
});
