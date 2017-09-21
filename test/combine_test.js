import { createStore, combineReducers } from '../'
import test from 'tape'
import { assoc } from 'nanofp'

test('redux counter', t => {
  t.plan(2)
  const store = createStore(
    combineReducers({
      counter: (state = 0, action) => {
        switch (action.type) {
          case 'INCR':
            return state + 1
          case 'DECR':
            return state - 1
          default:
            return state
        }
      },
      app: (state = { title: 'Foo' }, action) => {
        switch (action.type) {
          case 'SET_TITLE':
            return assoc('title', action.payload, state)
          default:
            return state
        }
      }
    })
  )

  store.subscribe(state => {
    t.equals(state.counter, 1)
    console.log(state)
  })
  store.dispatch({ type: 'INCR' })
  store.dispatch({ type: 'SET_TITLE', payload: 'Bar' })
})
