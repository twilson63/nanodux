'use strict';

var nanofp = require('nanofp');

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var index = (function (reducer) {
  var subscriptions = [];
  var state = null;

  return {
    subscribe: function subscribe(fn) {
      subscriptions.push(fn);
    },
    dispatch: function dispatch(action) {
      if (nanofp.equals(typeof action === 'undefined' ? 'undefined' : _typeof(action), 'function')) {
        // TODO: Handle Thunk
        return action(this.dispatch, this.getState);
      }
      var prevState = state;
      state = nanofp.reduce(reducer, prevState, [action]);
      var invoke = function invoke(state, prevState) {
        return function (fn) {
          return fn(state, prevState);
        };
      };
      nanofp.map(invoke(state, prevState), subscriptions);
    },
    getState: function getState() {
      return state;
    }
  };
});

module.exports = index;
