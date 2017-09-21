import {
  reduce,
  map,
  equals,
  merge,
  keys,
  assoc,
  ifElse,
  always,
  identity,
  isNil
} from 'nanofp'

export const combineReducers = reducers => {
  const defaultState = reduce((a, v) => assoc(v, null, a), {}, keys(reducers))
  return (state, action) => {
    state = ifElse(isNil, always(defaultState), identity)(state)
    return merge.apply(
      null,
      map(key => {
        return { [key]: reducers[key](state[key], action) }
      }, Object.keys(reducers))
    )
  }
}

export const createStore = reducer => {
  let subscriptions = []
  let state = null

  return {
    subscribe(fn) {
      subscriptions.push(fn)
    },
    dispatch(action) {
      if (equals(typeof action, 'function')) {
        // TODO: Handle Thunk
        return action(this.dispatch, this.getState)
      }
      const prevState = state
      state = reduce(reducer, prevState, [action])
      const invoke = (state, prevState) => fn => fn(state, prevState)
      map(invoke(state, prevState), subscriptions)
    },
    getState() {
      return state
    }
  }
}
