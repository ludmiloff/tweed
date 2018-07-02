'use strict';

var _Console = require('../Console');

var _Console2 = _interopRequireDefault(_Console);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stack = (typeof window !== 'undefined' ? global : window).dontMakePromisesInRenderStack;

var rendersInStack = stack.split('\n').filter(function (l) {
  return (/render/.test(l)
  );
});

_Console2.default.error("Is seems like you're making a <code>Promise</code> from " + 'within a <code>render</code> method. Move the call to the ' + 'constructor instead. ' + (rendersInStack.length > 0 ? 'Maybe check out these locations:\n' + rendersInStack.join('\n') : ''));