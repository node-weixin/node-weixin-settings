import assert from 'assert';
import nodeWeixinSettings from '../lib';
import nodeWeixinSettings1 from '../lib';

describe('node-weixin-settings', function () {
  it('should be equal before !', function () {
    assert.equal(true, nodeWeixinSettings === nodeWeixinSettings1);
  });

  it('should get what is set!', function () {

    var set = {state: 'STATE', scope: 0};
    nodeWeixinSettings.set(1, 'oauth', set);
    var get = nodeWeixinSettings.get(1, 'oauth');

    assert.equal(true, set === get);
    assert.equal(true, nodeWeixinSettings.get(1, 'oauth1') === null);

    var all = nodeWeixinSettings.all(1);
    assert.equal(true, all.oauth === get);
    all = nodeWeixinSettings.all(2);
    assert.equal(true, all.oauth === undefined);
  });

  it('should register get, set!', function () {
    var insideGet = false;
    var insideSet = false;
    var insideAll = false;
    var sessionConf = {};


    function MyGet(id, key) {
      insideGet = true;
      if (sessionConf[id] && sessionConf[id][key]) {
        return sessionConf[id][key];
      }
      return null;
    }

    function MySet(id, key, value) {
      insideSet = true;
      if (!sessionConf[id]) {
        sessionConf[id] = {};
      }
      sessionConf[id][key] = value;
    }

    function MyAll(id) {
      insideAll = true;
      if (!sessionConf[id]) {
        sessionConf[id] = {};
      }
      return sessionConf[id];
    }

    assert.equal(true, nodeWeixinSettings.registerSet(MySet));

    var set = {state: 'STATE', scope: 0};
    nodeWeixinSettings.set(1, 'oauth', set);

    assert.equal(true, insideSet);

    assert.equal(true, nodeWeixinSettings.registerGet(MyGet));

    var get = nodeWeixinSettings.get(1, 'oauth');
    assert.equal(true, insideGet);
    assert.equal(true, set === get);

    assert.equal(true, nodeWeixinSettings.registerAll(MyAll));
    assert.equal(true, typeof nodeWeixinSettings.all(1) === 'object');
    assert.equal(true, insideAll);

    assert.equal(false, nodeWeixinSettings.registerGet('MyGet'));
    assert.equal(false, nodeWeixinSettings.registerSet('MySet'));
    assert.equal(false, nodeWeixinSettings.registerAll('MyAll'));

  });

  it('should be equal after!', function () {
    assert.equal(true, nodeWeixinSettings === nodeWeixinSettings1);
  });
});
