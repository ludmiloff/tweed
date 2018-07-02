'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (engine, factory, vnode) {
  if (vnode.__DONT_NOTIFY_DEVTOOLS__) {
    return;
  }
  globl[listeners].forEach(function (l) {
    return l(engine, factory, vnode);
  });
  globl[listeners].all.push([engine, factory, vnode]);
};

var globl = typeof window === 'undefined' ? global : window;

var listeners = '__TWEED_ON_RENDER_LISTENERS__';

globl[listeners] = globl[listeners] || [];

globl[listeners].all = globl[listeners].all || [];