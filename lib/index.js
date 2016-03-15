'use strict';

require('colors');

// WARN: these functions should be replaced in real production environment
function get(id, key, cb) {
  console.log('You must register a new ' + 'get'.red + ' function with ' + 'node-weixin-settings'.red +
    ', and should not use this function in production!');
  if (this._[id] && this._[id][key]) {
    cb(this._[id][key]);
  } else {
    cb(null);
  }
}

function set(id, key, value, cb) {
  console.log('You must register a new ' + 'set'.red + ' function with ' + 'node-weixin-settings'.red +
    ', and should not use this function in production!');
  if (!this._[id]) {
    this._[id] = {};
  }
  this._[id][key] = value;
  if (cb) {
    cb();
  }
}

function all(id, cb) {
  console.log('You must register a new ' + 'all'.red + ' function with ' + 'node-weixin-settings'.red +
    ', and should not use this function in production!');
  if (!this._[id]) {
    this._[id] = {};
  }
  cb(this._[id]);
}

module.exports = {
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
  get: function (id, key, cb) {
    this._get(id, key, cb);
  },
  set: function (id, key, value, cb) {
    this._set(id, key, value, cb);
  },
  all: function (id, cb) {
    return this._all(id, cb);
  }
};
