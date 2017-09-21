import { createStore } from '../'
import test from 'tape'

test('redux counter', t => {
  t.plan(1)
  const store = createStore((state = 0, action) => {
    switch (action.type) {
      case 'INCR':
        return state + 1
      case 'DECR':
        return state - 1
      default:
        return state
    }
  })

  store.subscribe(state => {
    t.equals(state, 1)
  })
  store.dispatch({ type: 'INCR' })
})

test('redux thunk', t => {
  t.plan(1)
  const store = createStore((state = 0, action) => {
    switch (action.type) {
      case 'INCR':
        return state + 1
      case 'DECR':
        return state - 1
      default:
        return state
    }
  })

  store.subscribe(state => {
    t.equals(state, 1)
  })
  store.dispatch(dispatch => {
    setTimeout(() => {
      dispatch({ type: 'INCR' })
    }, 100)
  })
})
