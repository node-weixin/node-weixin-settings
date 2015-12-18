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

function get(req, key) {
  var id = req.session.id;
  if (this._[id] && this._[id][key]) {
    return this._[id][key];
  }
  return null;
}

function set(req, key, value) {
  var id = req.session.id;
  if (!this._[id]) {
    this._[id] = _.clone(stock);
  }
  this._[id][key] = value;
}
function all(req) {
  var id = req.session.id;
  if (!this._[id]) {
    this._[id] = _.clone(stock);
  }
  return this._[id];
}

class Settings {
  constructor() {
    this._ = {};
    this._get = get;
    this._set = set;
    this._all = all;
  }

  registerGet(cb) {
    if (cb instanceof Function) {
      this._get = cb;
      return true;
    }
    return false;
  }

  registerSet(cb) {
    if (cb instanceof Function) {
      this._set = cb;
      return true;
    }
    return false;
  }

  registerAll(cb) {
    if (cb instanceof Function) {
      this._all = cb;
      return true;
    }
    return false;
  }

  get(req, key) {
    return this._get(req, key);
  }

  set(req, key, value) {
    this._set(req, key, value);
  }
  all(req) {
    return this._all(req);
  }
}

export default new Settings();
