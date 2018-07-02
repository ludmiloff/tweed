'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MUTATING_FIELDS = exports.WATCHED = exports.STATEFUL = exports.UPDATE = exports.createSymbol = undefined;

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createSymbol = exports.createSymbol = typeof _symbol2.default === 'undefined' ? String : _symbol2.default;

var UPDATE = exports.UPDATE = createSymbol('[[UPDATE]]');
var STATEFUL = exports.STATEFUL = createSymbol('[[STATEFUL]]');
var WATCHED = exports.WATCHED = createSymbol('[[WATCHED]]');
var MUTATING_FIELDS = exports.MUTATING_FIELDS = createSymbol('[[MUTATING_FIELDS]]');