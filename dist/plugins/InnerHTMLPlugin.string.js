"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (vnode, attributes) {
  if (!vnode.data.innerHTML) {
    return;
  }

  vnode.data.props = vnode.data.props || {};

  // Snabbdom-to-html resolves this correctly
  vnode.data.props.innerHTML = vnode.data.innerHTML;
};