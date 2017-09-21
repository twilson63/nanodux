'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var nanofp = require('nanofp');

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var combineReducers = function combineReducers(reducers) {
  var defaultState = nanofp.reduce(function (a, v) {
    return nanofp.assoc(v, null, a);
  }, {}, nanofp.keys(reducers));
  return function (state, action) {
    state = nanofp.ifElse(nanofp.isNil, nanofp.always(defaultState), nanofp.identity)(state);
    return nanofp.merge.apply(null, nanofp.map(function (key) {
      return _defineProperty({}, key, reducers[key](state[key], action));
    }, Object.keys(reducers)));
  };
};

var createStore = function createStore(reducer) {
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
};

exports.combineReducers = combineReducers;
exports.createStore = createStore;
