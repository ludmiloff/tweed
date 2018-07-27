'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualNode = exports.VirtualTextNode = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Engine = require('./Engine');

var _Engine2 = _interopRequireDefault(_Engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VirtualTextNode = exports.VirtualTextNode = function () {
  function VirtualTextNode(text) {
    (0, _classCallCheck3.default)(this, VirtualTextNode);

    this.text = text;
    this.attributes = {};
    this.isTextNode = true;
  }

  (0, _createClass3.default)(VirtualTextNode, [{
    key: 'toString',
    value: function toString() {
      return this.text;
    }
  }, {
    key: 'toPureSnabbdomVNode',
    value: function toPureSnabbdomVNode() {
      return {
        sel: undefined,
        data: undefined,
        children: undefined,
        elm: undefined,
        text: this.text,
        key: undefined
      };
    }
  }]);
  return VirtualTextNode;
}();

var VirtualNode = exports.VirtualNode = function () {
  /**
   * Creates a new Virtual DOM Node.
   *
   * @param string       tagName    The tag name of the DOM node
   * @param any          attributes Attributes on the DOM node
   * @param Renderable[] children   DOM child nodes
   */
  function VirtualNode(tagName, attributes, children) {
    (0, _classCallCheck3.default)(this, VirtualNode);
    this.isTextNode = false;
    this._trackedChildren = null;
    this.text = undefined;
    this.elm = undefined;
    this.key = undefined;

    this.tagName = tagName;
    this.attributes = attributes == null ? {} : attributes;
    this.children = this._renderChildren(this._transformRenderables(children).filter(this._isRenderable));
    this.data = this._createSnabbdomData();

    if (process.env.NODE_ENV !== 'production') {
      this.__stack = process.env.NODE_ENV === 'test' ? '' : new Error().stack;
    }
  }

  /**
   * Filters out children that should not be rendered
   * at all.
   *
   * @param any renderable
   *
   * @returns Renderable
   */


  (0, _createClass3.default)(VirtualNode, [{
    key: '_isRenderable',
    value: function _isRenderable(renderable) {
      if (renderable == null) {
        return false;
      }

      if (renderable === '') {
        return false;
      }

      return true;
    }
  }, {
    key: '_transformRenderables',
    value: function _transformRenderables(renderables) {
      return renderables.map(this._transformRenderable);
    }
  }, {
    key: '_transformRenderable',
    value: function _transformRenderable(renderable) {
      for (var i = 0; i < _Engine2.default.plugins.length; i++) {
        var plugin = _Engine2.default.plugins[i];

        if (typeof plugin.transformRenderable === 'function') {
          var res = plugin.transformRenderable(renderable);

          if (res != null) {
            return res;
          }
        }
      }
      return renderable;
    }
  }, {
    key: 'toString',
    value: function toString() {
      if (this._circularCheck) {
        return '[circular]';
      }

      this._circularCheck = true;

      if (this.children == null || this.children.length === 0) {
        return this.tagName + ' {}';
      }

      var inner = this.children.map(function (c) {
        return c.toString();
      }).join('\n  ');

      this._circularCheck = false;

      return this.tagName + ' {\n  ' + inner + '\n}';
    }
  }, {
    key: '_renderChildren',
    value: function _renderChildren(childRenderable) {
      var _childRenderable$redu = childRenderable.reduce(VirtualNode._renderChild, {
        children: [],
        tracked: []
      }),
          children = _childRenderable$redu.children,
          tracked = _childRenderable$redu.tracked;

      if (process.env.NODE_ENV !== 'production') {
        this._ownTrackedChildren = tracked;
      }

      this._trackedChildren = [].concat((0, _toConsumableArray3.default)(tracked), (0, _toConsumableArray3.default)(children.reduce(function (a, c) {
        if (c._trackedChildren != null) {
          return a.concat(c._trackedChildren);
        }
        return a;
      }, [])));

      return children;
    }
  }, {
    key: 'toPureSnabbdomVNode',
    value: function toPureSnabbdomVNode() {
      return {
        sel: this.sel,
        data: this.data,
        children: this.children.map(function (c) {
          return c.toPureSnabbdomVNode();
        }),
        elm: this.elm,
        text: this.text,
        key: this.key
      };
    }

    /**
     * Creates the data property for the snabbdom
     * vnode. Should be considered unsafely mutable
     * and is referenced in the snabbdom "modules" (plugins).
     *
     * @returns Object
     */

  }, {
    key: '_createSnabbdomData',
    value: function _createSnabbdomData() {
      var _this = this;

      var data = {};
      var attributes = {};

      if ('key' in this.attributes) {
        data.key = this.attributes.key;
        delete this.attributes.key;
      }

      // Shallow copy
      for (var p in this.attributes) {
        attributes[p] = this.attributes[p];
      }

      _Engine2.default.plugins.forEach(function (p) {
        return (
          // This method may mutate data freely, and also
          // remove items from attributes, but not mutate
          // any of the attribute values
          p.consumeAttributes(data, attributes, _this)
        );
      });

      return data;
    }

    /**
     * @internal
     * @see snabbdom
     */

  }, {
    key: 'element',
    get: function get() {
      return this.elm || null;
    }
  }, {
    key: 'sel',
    get: function get() {
      return this.tagName;
    }

    /**
     * @internal
     * @see snabbdom
     */


    /**
     * @internal
     * @see snabbdom
     */


    /**
     * @internal
     * @see snabbdom
     */

  }], [{
    key: '_renderChild',
    value: function _renderChild(_ref, renderable) {
      var children = _ref.children,
          tracked = _ref.tracked;

      if (renderable == null) {
        return { children: children, tracked: tracked };
      }

      if (typeof renderable === 'string') {
        return {
          children: [].concat((0, _toConsumableArray3.default)(children), [new VirtualTextNode(renderable)]),
          tracked: tracked
        };
      }

      if (Array.isArray(renderable)) {
        var _renderable$reduce = renderable.reduce(VirtualNode._renderChild, { children: [], tracked: [] }),
            reducedChildren = _renderable$reduce.children,
            reducedTracked = _renderable$reduce.tracked;

        return {
          children: [].concat((0, _toConsumableArray3.default)(children), (0, _toConsumableArray3.default)(reducedChildren)),
          tracked: [].concat((0, _toConsumableArray3.default)(tracked), (0, _toConsumableArray3.default)(reducedTracked))
        };
      }

      if ((typeof renderable === 'undefined' ? 'undefined' : (0, _typeof3.default)(renderable)) !== 'object') {
        return VirtualNode._renderChild({ children: children, tracked: tracked }, String(renderable));
      }

      if (renderable.render != null) {
        if (typeof renderable.render === 'function') {
          if (typeof renderable.__isDirty === 'undefined' || renderable.__isDirty === false) {
            renderable.__vnode = VirtualNode._renderChild({
              children: children,
              tracked: [].concat((0, _toConsumableArray3.default)(tracked), [renderable])
            }, renderable.render());
            renderable.__isDirty = false;
          }
          return renderable.__vnode;
        }

        return VirtualNode._renderChild({ children: children, tracked: tracked }, renderable.render);
      }

      return {
        children: [].concat((0, _toConsumableArray3.default)(children), [renderable]),
        tracked: tracked
      };
    }
  }]);
  return VirtualNode;
}();

exports.default = function (tagName, attributes) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return new VirtualNode(tagName, attributes, children);
};