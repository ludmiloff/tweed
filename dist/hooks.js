"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostHook = exports.RemoveHook = exports.Destroy = exports.PostPatchHook = exports.UpdateHook = exports.PrePatchHook = exports.InsertHook = exports.CreateHook = exports.InitHook = exports.PreHook = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PreHook = exports.PreHook = function PreHook() {
  (0, _classCallCheck3.default)(this, PreHook);
};

var InitHook = exports.InitHook = function InitHook(node) {
  (0, _classCallCheck3.default)(this, InitHook);

  this.node = node;
};

var CreateHook = exports.CreateHook = function CreateHook(emptyVnode, vnode) {
  (0, _classCallCheck3.default)(this, CreateHook);

  this.old = emptyVnode;
  this.new = vnode;
  this.element = vnode.element;
};

var InsertHook = exports.InsertHook = function InsertHook(node) {
  (0, _classCallCheck3.default)(this, InsertHook);

  this.node = node;
  this.element = node.element;
};

var PrePatchHook = exports.PrePatchHook = function PrePatchHook(oldNode, node) {
  (0, _classCallCheck3.default)(this, PrePatchHook);

  this.old = oldNode;
  this.new = node;
  this.element = node.element;
};

var UpdateHook = exports.UpdateHook = function UpdateHook(oldNode, node) {
  (0, _classCallCheck3.default)(this, UpdateHook);

  this.old = oldNode;
  this.new = node;
  this.element = node.element;
};

var PostPatchHook = exports.PostPatchHook = function PostPatchHook(oldNode, node) {
  (0, _classCallCheck3.default)(this, PostPatchHook);

  this.old = oldNode;
  this.new = node;
  this.element = node.element;
};

var Destroy = exports.Destroy = function Destroy(node) {
  (0, _classCallCheck3.default)(this, Destroy);

  this.node = node;
  this.element = node.element;
};

var RemoveHook = exports.RemoveHook = function RemoveHook(node, callback) {
  (0, _classCallCheck3.default)(this, RemoveHook);

  this.node = node;
  this.done = callback;
};

var PostHook = exports.PostHook = function PostHook() {
  (0, _classCallCheck3.default)(this, PostHook);
};