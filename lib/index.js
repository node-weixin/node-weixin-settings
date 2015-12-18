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

export default {
  _: {},
  _get: get,
  _set: set,
  _all: all,
  registerGet: function (cb) {
    if (cb instanceof Function) {
      this._get = cb;
      return true;
    }
    return false;
  },

  registerSet: function (cb) {
    if (cb instanceof Function) {
      this._set = cb;
      return true;
    }
    return false;
  },

  registerAll: function (cb) {
    if (cb instanceof Function) {
      this._all = cb;
      return true;
    }
    return false;
  },
  get: function (id, key) {
    return this._get(id, key);
  },
  set: function (id, key, value) {
    this._set(id, key, value);
  },
  all: function (id) {
    return this._all(id);
  }
};
