import assert from 'assert';
import nodeWeixinSettings from '../lib';
import _ from 'lodash';

describe('node-weixin-settings', function () {
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

    assert.equal(true, nodeWeixinSettings.registerSet(MySet));

    var set = {state: 'STATE', scope: 0};
    nodeWeixinSettings.set(req, 'oauth', set);

    assert.equal(true, insideSet);

    assert.equal(true, nodeWeixinSettings.registerGet(MyGet));

    var get = nodeWeixinSettings.get(req, 'oauth');
    assert.equal(true, insideGet);
    assert.equal(true, set === get);
    assert.equal(false, nodeWeixinSettings.registerGet('MyGet'));
    assert.equal(false, nodeWeixinSettings.registerSet('MySet'));
  });
});
