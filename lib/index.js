
import {} from 'colors';

//WARN: these functions should be replaced in real production environment
function get(id, key) {
  console.log('You must register a new ' + 'get'.red + ' function with ' + 'node-weixin-settings'.red +
    ', and should not use this function in production!');
  if (this._[id] && this._[id][key]) {
    return this._[id][key];
  }
  return null;
}

function set(id, key, value) {
  console.log('You must register a new ' + 'set'.red + ' function with ' + 'node-weixin-settings'.red +
    ', and should not use this function in production!');
  if (!this._[id]) {
    this._[id] = {};
  }
  this._[id][key] = value;
}
function all(id) {
  console.log('You must register a new ' + 'all'.red + ' function with ' + 'node-weixin-settings'.red +
    ', and should not use this function in production!');
  if (!this._[id]) {
    this._[id] = {};
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
