import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
  SAVE_DELIVERY_METHOD,
  SAVE_SHIPPING_FEE,
} from '../types/cartTypes'
import ApiCall from '../../network/ApiCall'
const api = new ApiCall()
export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const res = await api.getProductById(id)

    if (res.status === 200) {
      const { data } = res
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          productId: data.data._id,
          name: data.data.name,
          image: data.data.image,
          price: data.data.price,
          countInStock: data.data.countInStock,
          qty,
        },
      })
      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      )
    }
  } catch (error) {}
}
export const removeItemFromCart = id => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = data => dispatch => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: data,
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = data => dispatch => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: data,
  })
  localStorage.setItem('paymentMethod', data)
}

export const saveDeliverytMethod = data => dispatch => {
  dispatch({
    type: SAVE_DELIVERY_METHOD,
    payload: data,
  })
  localStorage.setItem('deliveryMethod', data)
}

export const saveShippingFee = data => dispatch => {
  dispatch({
    type: SAVE_SHIPPING_FEE,
    payload: data,
  })
  localStorage.setItem('shippingFee', data)
}
