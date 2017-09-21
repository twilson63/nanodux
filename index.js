import { reduce, map, equals, merge, keys } from 'nanofp'

export const combineReducers = reducers => {
  return (state, action) => {
    return merge.apply(
      null,
      map(key => {
        return { [key]: reducers[key](state[key], action) }
      }, keys(reducers))
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
