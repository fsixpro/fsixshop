import { combineReducers } from 'redux'
import {
  CreateProductReviewReducer,
  deleteProductReducer,
  productDetailsReducer,
  productListAdminReducer,
  productListReducer,
  updateProductReducer,
} from './productReducer'
import { cartReducer } from '../reducers/cartReducer'
import {
  deleteUserReducer,
  userLoginReducer,
  userProfileReducer,
  usersListReducer,
} from './userReducer'
import {
  myOrdersReducer,
  orderDetailReducer,
  orderPayReducer,
  orderReducer,
} from './orderReducer'
const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,
  createProductReview: CreateProductReviewReducer,
  productListAdmin: productListAdminReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  orderCreate: orderReducer,
  orderDetail: orderDetailReducer,
  orderPay: orderPayReducer,
  myOrderList: myOrdersReducer,
  usersList: usersListReducer,
  deleteUser: deleteUserReducer,
})
export default rootReducer
