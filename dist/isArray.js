'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isArray;
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}