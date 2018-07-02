'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Node = exports.mutating = exports.VirtualNode = exports.Engine = exports.Hooks = undefined;

require('./dev');

var _MutatingDecorator = require('./MutatingDecorator');

var _MutatingDecorator2 = _interopRequireDefault(_MutatingDecorator);

var _VirtualNode2 = require('./VirtualNode');

var _VirtualNode3 = _interopRequireDefault(_VirtualNode2);

var _hooks = require('./hooks');

var Hooks = _interopRequireWildcard(_hooks);

var _global = require('./global');

var _global2 = _interopRequireDefault(_global);

var _Engine2 = require('./Engine');

var _Engine3 = _interopRequireDefault(_Engine2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Hooks = Hooks;
exports.Engine = _Engine3.default;
exports.VirtualNode = _VirtualNode3.default;
var mutating = exports.mutating = _MutatingDecorator2.default.bind(null, false);
mutating.sync = _MutatingDecorator2.default.bind(null, true);
mutating.async = mutating;

// This part makes JSX work even if someone is using a transpiler
// that converts to `React.createElement` instead of `VirtualNode`.
if (_global2.default.React == null) {
  _global2.default.React = {
    createElement: _VirtualNode3.default
  };
}

var Node = exports.Node = process.env.NODE_ENV !== 'production' ? function () {
  return require('./dev/messages/apiHasChangedForVirtualNodes');
} : undefined;