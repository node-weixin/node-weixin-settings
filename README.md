# node-weixin-settings [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> node weixin settings

## Installation

```sh
$ npm install --save node-weixin-settings
```

## Usage

1.使用前一定要registerSet,registerGet
2.如果不使用，会导致内存不断上涨，并且无法回收
3.注册的get方法里不能包含任何异步方法，必须直接返回数据

```js
var Settings = require('node-weixin-settings');
var nodeWeixinSettings = new Settings();

nodeWeixinSettings.registerSet(function() {
});
nodeWeixinSettings.registerGet(function() {
});

nodeWeixinSettings.get(req, key);
nodeWeixinSettings.set(req, key, value);

nodeWeixinSettings.all(req);

```
## License

MIT © [node-weixin](blog.3gcnbeta.com)


[npm-image]: https://badge.fury.io/js/node-weixin-settings.svg
[npm-url]: https://npmjs.org/package/node-weixin-settings
[travis-image]: https://travis-ci.org/node-weixin/node-weixin-settings.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-weixin-settings
[daviddm-image]: https://david-dm.org/node-weixin/node-weixin-settings.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-weixin-settings
[coveralls-image]: https://coveralls.io/repos/node-weixin/node-weixin-settings/badge.svg
[coveralls-url]: https://coveralls.io/r/node-weixin/node-weixin-settings
