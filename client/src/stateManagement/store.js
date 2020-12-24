import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
const middleware = [thunk]
const cartItemFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const userFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const shippingFeeFromStorage = localStorage.getItem('shippingFee')
  ? parseInt(localStorage.getItem('shippingFee'))
  : 0

const deliveryMethodFromStorage = localStorage.getItem('deliveryMethod')
  ? localStorage.getItem('deliveryMethod')
  : 'standard'

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? localStorage.getItem('paymentMethod')
  : 'paypal'
const initialState = {
  cart: {
    cartItems: cartItemFromStorage,
    shippingAddress: shippingAddressFromStorage,
    shippingFee: shippingFeeFromStorage,
    deliveryMethod: deliveryMethodFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userFromStorage },
}
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
