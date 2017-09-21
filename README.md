# nanodux

A tiny implementation of a redux like api.

This light version of redux comes with thunk built-in to dispatch, there is not concept of middleware, it simply provides a createStore method that creates an object which has the `dispatch`, `subscribe`, and `getState` methods.

TODO: combineReducers method

## Usage

``` js
import createStore from 'nanodux'

const store = createStore(
  (state=0, action) => {
    switch (action.type) {
      default:
        return state
    }
  }
)

store.subscribe((state, prevState) => {
  console.log('state changed')
})

store.dispatch({type: 'TAP', payload: 'Beep'})
```


## License

MIT

## Thank you

* Redux Community

---

DISCLAIMER: this module is only recommended for prototyping and learning, it is not battle tested for production systems, use Redux for that!
