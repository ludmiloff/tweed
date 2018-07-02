'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class2, _descriptor;

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  (0, _defineProperty2.default)(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var awaitedPromises = [];
var awaitedRenderablePromises = [];
var awaitedRenderablePromiseStacks = [];

var RenderablePromisePlugin = function () {
  function RenderablePromisePlugin() {
    (0, _classCallCheck3.default)(this, RenderablePromisePlugin);
    this.snabbdomModules = [{ update: this.update }];
  }

  (0, _createClass3.default)(RenderablePromisePlugin, [{
    key: 'consumeAttributes',
    value: function consumeAttributes() {}
  }, {
    key: 'transformRenderable',
    value: function transformRenderable(renderable) {
      if (renderable != null && (typeof renderable === 'undefined' ? 'undefined' : (0, _typeof3.default)(renderable)) === 'object' && typeof renderable.then === 'function') {
        if (awaitedPromises.indexOf(renderable) > -1) {
          return awaitedRenderablePromises[awaitedPromises.indexOf(renderable)];
        }

        var p = new RenderablePromise(renderable);

        if (process.env.NODE_ENV !== 'production') {
          p.__stack = new Error().stack;
        }

        return p;
      }
    }
  }, {
    key: 'update',
    value: function update(oldVNode, newVNode) {
      var oldTracked = oldVNode._ownTrackedChildren || [];
      var newTracked = newVNode._ownTrackedChildren || [];

      for (var i = 0; i < oldTracked.length; i++) {
        var tracked = oldTracked[i];

        if (process.env.NODE_ENV !== 'production') {
          if (oldTracked[i] instanceof RenderablePromise && newTracked[i] instanceof RenderablePromise && oldTracked[i] !== newTracked[i] && oldTracked[i].__stack === newTracked[i].__stack) {
            ;(typeof window !== 'undefined' ? global : window).dontMakePromisesInRenderStack = newVNode.__stack;
            require('../dev/messages/dontMakePromisesInRender');
          }
        }

        if (newTracked.indexOf(tracked) > -1) {
          continue;
        }

        var index = awaitedRenderablePromises.indexOf(tracked);
        if (index === -1) {
          continue;
        }

        awaitedPromises.splice(index, 1);
        awaitedRenderablePromises.splice(index, 1);
        if (process.env.NODE_ENV !== 'production') {
          awaitedRenderablePromiseStacks.splice(index, 1);
        }
      }
    }
  }]);
  return RenderablePromisePlugin;
}();

exports.default = RenderablePromisePlugin;
var RenderablePromise = (_class2 = function () {
  function RenderablePromise(promise) {
    var _this = this;

    (0, _classCallCheck3.default)(this, RenderablePromise);

    _initDefineProp(this, 'value', _descriptor, this);

    this._promise = promise;

    awaitedPromises.push(promise);
    awaitedRenderablePromises.push(this);

    promise.then(function (v) {
      _this.value = v;
    });
  }

  (0, _createClass3.default)(RenderablePromise, [{
    key: 'render',
    value: function render() {
      return this.value;
    }
  }]);
  return RenderablePromise;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_.mutating], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class2);