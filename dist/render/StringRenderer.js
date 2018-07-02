'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringRenderer = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = render;

var _Engine = require('../Engine');

var _Engine2 = _interopRequireDefault(_Engine);

var _init = require('snabbdom-to-html/init');

var _init2 = _interopRequireDefault(_init);

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

var _InnerHTMLPlugin3 = require('../plugins/InnerHTMLPlugin.string');

var _InnerHTMLPlugin4 = _interopRequireDefault(_InnerHTMLPlugin3);

var _AttributesPlugin = require('../plugins/AttributesPlugin');

var _AttributesPlugin2 = _interopRequireDefault(_AttributesPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Engine2.default.plugins = [new _ClassPlugin2.default([require('snabbdom-to-html/modules/class')]), new _EventsPlugin2.default([]), // Noop but consumes attributes
new _HooksPlugin2.default([]), new _StylePlugin2.default([require('snabbdom-to-html/modules/style')]), new _InnerHTMLPlugin2.default([_InnerHTMLPlugin4.default]), new _AttributesPlugin2.default([require('snabbdom-to-html/modules/attributes'), require('snabbdom-to-html/modules/props')])];

var toHTML = (0, _init2.default)(_Engine2.default.snabbdomModules);

var StringRenderer = exports.StringRenderer = function () {
  function StringRenderer(listener) {
    (0, _classCallCheck3.default)(this, StringRenderer);

    this._listener = listener;
  }

  (0, _createClass3.default)(StringRenderer, [{
    key: 'render',
    value: function render(node) {
      this._listener(toHTML(node));
    }
  }]);
  return StringRenderer;
}();

function render(factory, listener) {
  var engine = new _Engine2.default(new StringRenderer(listener));

  engine.render(factory);
}