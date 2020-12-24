import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
  SAVE_DELIVERY_METHOD,
  SAVE_SHIPPING_FEE,
  CLEAR_CART_ITEMS,
} from '../types/cartTypes'

const initialState = {
  cartItems: [],
  shippingAddress: {},
}

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload
      const itemExist = state.cartItems.find(
        cartItem => cartItem.productId === item.productId
      )
      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map(cartItem =>
            cartItem.productId === itemExist.productId ? item : cartItem
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.productId !== payload
        ),
      }
    case CLEAR_CART_ITEMS:
      return {
        cartItems: [],
      }
    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      }
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      }
    case SAVE_DELIVERY_METHOD:
      return {
        ...state,
        deliveryMethod: payload,
      }
    case SAVE_SHIPPING_FEE:
      return {
        ...state,
        shippingFee: payload,
      }
    default:
      return state
  }
}
