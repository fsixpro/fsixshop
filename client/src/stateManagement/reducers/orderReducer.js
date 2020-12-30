import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_PAY_RESET,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  // ORDER_CREATE_RESET,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
} from '../types/orderTypes'

const initialState = {}

export const orderReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}

export const orderDetailReducer = (
  state = { order: {}, shippingAddress: {}, loading: true },
  action
) => {
  const { type, payload } = action
  switch (type) {
    case ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        order: payload,
      }
    case ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: payload,
        order: {},
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const myOrdersReducer = (
  state = { loading: true, myOrders: [] },
  action
) => {
  const { type, payload } = action
  switch (type) {
    case GET_MY_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_MY_ORDERS_SUCCESS:
      return {
        loading: false,
        myOrders: payload,
      }
    case GET_MY_ORDERS_FAIL:
      return {
        loading: false,
        error: payload,
      }

    default:
      return state
  }
}
