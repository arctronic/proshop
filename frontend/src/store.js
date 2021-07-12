/* eslint-disable no-unused-vars */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer } from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducer'

const reducer = combineReducers({
	productList : productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
})

const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[]


const initialState = {cartItems: cartItemFromStorage}
const middleware = [thunkMiddleware]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store