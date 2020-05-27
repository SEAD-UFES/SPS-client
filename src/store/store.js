/** @format */

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

const initialState = {}

const middleware = [thunk]

//create compose function - load redux plugin on browser if have it.
let composeFunction
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  composeFunction = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )
} else {
  composeFunction = compose(applyMiddleware(...middleware))
}

//Create and export the store
const store = createStore(rootReducer, initialState, composeFunction)

export default store
