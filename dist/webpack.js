'use strict';

var _index = require('./index');

var index = _interopRequireWildcard(_index);

var _DOMRenderer = require('./render/DOMRenderer');

var _DOMRenderer2 = _interopRequireDefault(_DOMRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = index;
module.exports.render = _DOMRenderer2.default;