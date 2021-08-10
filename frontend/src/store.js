/* eslint-disable no-unused-vars */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer } from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducer'
import {userDetailsReducer, userLogInReducer, userRegReducer,userUpdateProfileReducer} from './reducers/userReducer'
import { orderCreateReducer, orderDetailsReducers } from './reducers/orderReducers'

const reducer = combineReducers({
	productList : productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLogInReducer,
	userReg: userRegReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducers,
})

const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[]
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) :null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) :{}

const initialState = {
	cart: {
		cartItems: cartItemFromStorage,
		shippingAddress: shippingAddressFromStorage
	},
	
	userLogin: {userInfo: userInfoFromStorage}
}
const middleware = [thunkMiddleware]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store