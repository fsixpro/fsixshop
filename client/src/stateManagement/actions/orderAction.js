import Apicall from '../../network/ApiCall'
import { CLEAR_CART_ITEMS } from '../types/cartTypes'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
} from '../types/orderTypes'
const api = new Apicall()

export const createOrder = order => async dispatch => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })
    const res = await api.createOrder(order)
    const {
      data: { data, msg },
    } = res
    if (res.status === 201) {
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: CLEAR_CART_ITEMS })
      localStorage.removeItem('cartItems')
      localStorage.removeItem('shippingAddress')
      localStorage.removeItem('paymentMethod')
      localStorage.removeItem('deliveryMethod')
      localStorage.removeItem('shippingFee')
    } else {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: msg,
      })
    }
  } catch (error) {}
}

export const orderDetail = orderId => async dispatch => {
  try {
    dispatch({
      type: ORDER_DETAIL_REQUEST,
    })
    const res = await api.orderDetail(orderId)
    const {
      data: { data, msg },
    } = res
    if (res.status === 200) {
      dispatch({
        type: ORDER_DETAIL_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({
        type: ORDER_DETAIL_FAIL,
        payload: msg,
      })
    }
  } catch (error) {}
}

export const orderPay = (orderId, paymentResult) => async dispatch => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    })
    const res = await api.orderPay(orderId, paymentResult)
    const {
      data: { data, msg },
    } = res
    if (res.status === 200) {
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: msg,
      })
    }
  } catch (error) {}
}

export const getMyOrders = () => async dispatch => {
  try {
    dispatch({
      type: GET_MY_ORDERS_REQUEST,
    })
    const res = await api.getMyOrders()
    const {
      data: { data, msg },
    } = res
    if (res.status === 200) {
      dispatch({
        type: GET_MY_ORDERS_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({
        type: GET_MY_ORDERS_FAIL,
        payload: msg,
      })
    }
  } catch (error) {}
}
