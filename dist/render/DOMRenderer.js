'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOMRenderer = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = render;

var _Engine = require('../Engine');

var _Engine2 = _interopRequireDefault(_Engine);

var _snabbdom = require('snabbdom');

var _ClassPlugin = require('../plugins/ClassPlugin');

var _ClassPlugin2 = _interopRequireDefault(_ClassPlugin);

var _EventsPlugin = require('../plugins/EventsPlugin');

var _EventsPlugin2 = _interopRequireDefault(_EventsPlugin);

var _HooksPlugin = require('../plugins/HooksPlugin');

var _HooksPlugin2 = _interopRequireDefault(_HooksPlugin);

var _StylePlugin = require('../plugins/StylePlugin');

var _StylePlugin2 = _interopRequireDefault(_StylePlugin);

var _InnerHTMLPlugin = require('../plugins/InnerHTMLPlugin');

var _InnerHTMLPlugin2 = _interopRequireDefault(_InnerHTMLPlugin);

var _InnerHTMLPlugin3 = require('../plugins/InnerHTMLPlugin.dom');

var _InnerHTMLPlugin4 = _interopRequireDefault(_InnerHTMLPlugin3);

var _RenderablePromisePlugin = require('../plugins/RenderablePromisePlugin');

var _RenderablePromisePlugin2 = _interopRequireDefault(_RenderablePromisePlugin);

var _AttributesPlugin = require('../plugins/AttributesPlugin');

var _AttributesPlugin2 = _interopRequireDefault(_AttributesPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Engine2.default.plugins = [new _ClassPlugin2.default([require('snabbdom/modules/class')]), new _EventsPlugin2.default([require('snabbdom/modules/eventlisteners')]), new _HooksPlugin2.default([]), new _StylePlugin2.default([require('snabbdom/modules/style')]), new _InnerHTMLPlugin2.default([_InnerHTMLPlugin4.default]), new _RenderablePromisePlugin2.default(), new _AttributesPlugin2.default([require('snabbdom/modules/attributes'), require('snabbdom/modules/props')])];

var patch = (0, _snabbdom.init)(_Engine2.default.snabbdomModules);

var DOMRenderer = exports.DOMRenderer = function () {
  function DOMRenderer(element) {
    (0, _classCallCheck3.default)(this, DOMRenderer);

    if (element == null) {
      throw new Error('Root element was null.');
    }

    this._root = element;
  }

  (0, _createClass3.default)(DOMRenderer, [{
    key: 'render',
    value: function render(node) {
      this._root = patch(this._root, node);
    }
  }]);
  return DOMRenderer;
}();

function render(factory, element) {
  var engine = new _Engine2.default(new DOMRenderer(element));

  engine.render(factory);
}