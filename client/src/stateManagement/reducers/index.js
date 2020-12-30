import { combineReducers } from 'redux'
import {
  CreateProductReviewReducer,
  deleteProductReducer,
  productCreateReducer,
  productDetailsReducer,
  productImageUploadReducer,
  productListAdminReducer,
  productListReducer,
  productTopReducer,
  updateProductReducer,
} from './productReducer'
import { cartReducer } from '../reducers/cartReducer'
import {
  deleteUserReducer,
  updateUserReducer,
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
  productImageUpload: productImageUploadReducer,
  deleteProduct: deleteProductReducer,
  productCreate: productCreateReducer,
  updateProduct: updateProductReducer,
  createProductReview: CreateProductReviewReducer,
  productListAdmin: productListAdminReducer,
  productTop: productTopReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  updateUser: updateUserReducer,
  orderCreate: orderReducer,
  orderDetail: orderDetailReducer,
  orderPay: orderPayReducer,
  myOrderList: myOrdersReducer,
  usersList: usersListReducer,
  deleteUser: deleteUserReducer,
})
export default rootReducer
