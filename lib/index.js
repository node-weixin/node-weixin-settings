import _ from 'lodash';

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


//TODO: this code should be removed in real production environment
var sessionConf = {};

function getSessionConf(req, key) {
  var id = req.session.id;
  if (sessionConf[id] && sessionConf[id][key]) {
    return sessionConf[id][key];
  }
  return null;
}

function setSessionConf(req, key, value) {
  var id = req.session.id;
  if (!sessionConf[id]) {
    sessionConf[id] = _.clone(stock);
  }
  sessionConf[id][key] = value;
}

export default {
  _get: getSessionConf,
  _set: setSessionConf,
  registerGet: function(cb) {
    if (cb instanceof Function) {
      this._get = cb;
      return true;
    }
    return false;
  },
  registerSet: function(cb) {
    if (cb instanceof Function) {
      this._set = cb;
      return true;
    }
    return false;
  },
  get: function(req, key) {
    return this._get(req, key);
  },
  set: function(req, key, value) {
    this._set(req, key, value);
  }
};
