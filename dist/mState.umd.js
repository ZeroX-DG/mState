!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("mithril")):"function"==typeof define&&define.amd?define(["exports","mithril"],n):n(t.mState={},t.m)}(this,function(t,o){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}o=o&&o.hasOwnProperty("default")?o.default:o;var u={},i={},f={},c=function(n,t){return u[n]=t,{withActions:function(t){f[n]=t}}};t.makeState=function(o,t){var e={get:function(t,n){return t[n]&&"object"===r(t[n])?new Proxy(t[n],e):t[n]},set:function(t,n,e){return t[n]!==e&&(t[n]=e,i[o]&&i[o].forEach(function(t){return t()})),!0}},n=new Proxy(t,e);return c(o,n)},t.callAction=function(t,n,e){f[t][n](u[t],e)},t.inject=function(n,t){var e=null;return{oninit:function(){e=t.reduce(function(t,e){return t[e]=u[e],t[e]&&(t[e]._call=function(t,n){return f[e][t](u[e],n)}),t},{}),t.map(function(t){return n=t,e=o.redraw,void(i[n]=i[n]||[]).push(e);var n,e})},view:function(t){return e=Object.assign({},t.attrs,e),o(n,e)}}},Object.defineProperty(t,"__esModule",{value:!0})});
