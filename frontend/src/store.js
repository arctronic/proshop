/* eslint-disable no-unused-vars */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware  from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({})
const initialState = {}
const middleware = [thunkMiddleware ]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store