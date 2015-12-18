# node-weixin-settings [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> node weixin settings

## Installation

```sh
$ npm install --save node-weixin-settings
```

## Usage

>用于保存/获取只跟微信app id对应的数据

1.使用前一定要registerSet,registerGet,使用自定义的get,set函数
2.如果不使用，会导致内存不断上涨，并且无法回收
3.注册的get方法里不能包含任何异步方法，必须直接返回数据

```js
var nodeWeixinSettings = require('node-weixin-settings');

nodeWeixinSettings.registerSet(function() {
});
nodeWeixinSettings.registerGet(function() {
});

nodeWeixinSettings.get(id, key);
nodeWeixinSettings.set(id, key, value);

nodeWeixinSettings.all(id);

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
