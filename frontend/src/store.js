/* eslint-disable no-unused-vars */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer } from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducer'
import {userDetailsReducer, userLogInReducer, userRegReducer,userUpdateProfileReducer} from './reducers/userReducer'


const reducer = combineReducers({
	productList : productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLogInReducer,
	userReg: userRegReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
})

const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[]
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) :null


const initialState = {
	cart: {cartItems: cartItemFromStorage},
	userLogin: {userInfo: userInfoFromStorage}
}
const middleware = [thunkMiddleware]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store