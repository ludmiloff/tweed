'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var updateInnerHTML = function updateInnerHTML(oldNode, newNode) {
  var oldHTML = oldNode.data.innerHTML;
  var newHTML = newNode.data.innerHTML;

  if (oldHTML === newHTML) {
    return;
  }

  newNode.elm.innerHTML = newHTML || '';
};

exports.default = {
  create: updateInnerHTML,
  update: updateInnerHTML
};