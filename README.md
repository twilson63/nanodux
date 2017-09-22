# nanodux

A tiny implementation of a redux like api.

This light version of redux comes with thunk built-in to dispatch, there is not concept of middleware, it simply provides a createStore method that creates an object which has the `dispatch`, `subscribe`, and `getState` methods.

You also have the helper combineReducers to make it easy to build out a global state tree.

## Install

`yarn add nanodux`

## Usage

``` js
import { createStore, combineReducers } from 'nanodux'

const store = createStore(
  combineReducers({
    counter: (state=0, action) => {
      switch (action.type) {
        case 'INCR':
          return state + action.payload
        default:
          return state
      }
    }
  })
)

store.subscribe((state, prevState) => {
  console.log('state changed')
})

store.dispatch({type: 'INCR', payload: 1})
```

## Test

`yarn test`

## License

MIT

## Thank you

* Redux Community

---

DISCLAIMER: this module is only recommended for prototyping and learning, it is not battle tested for production systems, use Redux for that!
