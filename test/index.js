import assert from 'assert';
import Settings from '../lib';
import _ from 'lodash';

describe('node-weixin-settings', function () {

  var nodeWeixinSettings = new Settings();
  var req = {
    session: {
      id: 1
    }
  };
  it('should get what is set!', function () {

    var set = {state: 'STATE', scope: 0};
    nodeWeixinSettings.set(req, 'oauth', set);
    var get = nodeWeixinSettings.get(req, 'oauth');

    assert.equal(true, set === get);
    assert.equal(true, nodeWeixinSettings.get(req, 'oauth1') === null);

    var all = nodeWeixinSettings.all(req);
    assert.equal(true, all.oauth === get);
    req.session.id = 2;
    all = nodeWeixinSettings.all(req);
    assert.equal(true, all.oauth.state === null);
    assert.equal(true, all.oauth.scope === null);
    assert.equal(true, all.oauth.host === null);
    assert.equal(true, all.oauth.redirect === null);

  });

  it('should register get, set!', function () {
    var stock = {
      oauth: {
        state: null,
        scope: null,
        host: null,
        redirect: null
      },
      app: {
        id: null,
        secret: null,
        token: null
      },
      merchant: null,
      certificate: null,
      urls: null
    };
    var insideGet = false;
    var insideSet = false;
    var insideAll = false;
    var sessionConf = {};


    function MyGet(request, key) {
      var id = request.session.id;
      insideGet = true;
      if (sessionConf[id] && sessionConf[id][key]) {
        return sessionConf[id][key];
      }
      return null;
    }

    function MySet(request, key, value) {
      var id = request.session.id;
      insideSet = true;
      if (!sessionConf[id]) {
        sessionConf[id] = _.clone(stock);
      }
      sessionConf[id][key] = value;
    }

    function MyAll(request) {
      var id = request.session.id;
      insideAll = true;
      if (!sessionConf[id]) {
        sessionConf[id] = _.clone(stock);
      }
      return sessionConf[id];
    }

    assert.equal(true, nodeWeixinSettings.registerSet(MySet));

    var set = {state: 'STATE', scope: 0};
    nodeWeixinSettings.set(req, 'oauth', set);

    assert.equal(true, insideSet);

    assert.equal(true, nodeWeixinSettings.registerGet(MyGet));

    var get = nodeWeixinSettings.get(req, 'oauth');
    assert.equal(true, insideGet);
    assert.equal(true, set === get);

    assert.equal(true, nodeWeixinSettings.registerAll(MyAll));
    assert.equal(true, typeof nodeWeixinSettings.all(req) === 'object');
    assert.equal(true, insideAll);

    assert.equal(false, nodeWeixinSettings.registerGet('MyGet'));
    assert.equal(false, nodeWeixinSettings.registerSet('MySet'));
    assert.equal(false, nodeWeixinSettings.registerAll('MyAll'));

  });
});
