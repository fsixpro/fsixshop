import Apicall from '../../network/ApiCall'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  // UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL,
  PRODUCT_DETAILS_RESET,
  PRODUCT_LIST_ADMIN_REQUEST,
  PRODUCT_LIST_ADMIN_SUCCESS,
  PRODUCT_LIST_ADMIN_FAIL,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAIL,
  GET_TOP_PRODUCT_REQUEST,
  GET_TOP_PRODUCT_SUCCESS,
  GET_TOP_PRODUCT_FAIL,
  PRODUCT_IMAGE_UPLOAD_REQUEST,
  PRODUCT_IMAGE_UPLOAD_SUCCESS,
  PRODUCT_IMAGE_UPLOAD_FAIL,
  //PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
} from '../types/productTypes'
const api = new Apicall()
export const getProducts = (keyword, pageNumber) => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const res = await api.getProducts(keyword, pageNumber)
    if (res.status === 200) {
      const {
        data: { data },
      } = res
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({
        type: PRODUCT_LIST_FAIL,
      })
    }
  } catch (error) {}
}

export const getProductsAdmin = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_ADMIN_REQUEST })
    const res = await api.getProductsAdmin()
    if (res.status === 200) {
      const {
        data: { data },
      } = res
      dispatch({
        type: PRODUCT_LIST_ADMIN_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({
        type: PRODUCT_LIST_ADMIN_FAIL,
      })
    }
  } catch (error) {}
}

export const getProductById = id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const res = await api.getProductById(id)
    if (res.status === 200) {
      const { data } = res
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.data,
      })
    } else {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
      })
    }
  } catch (error) {}
}

export const productDelete = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    })
    const res = await api.deleteProduct(id)
    const {
      data: { msg },
    } = res
    if (res.status === 200) {
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
      })
      dispatch({
        type: DELETE_PRODUCT_RESET,
      })
    } else {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: msg,
      })
    }
  } catch (error) {}
}

export const updateProduct = (id, data) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    })
    const res = await api.updateProduct(id, data)
    const {
      data: { msg },
    } = res
    if (res.status === 200) {
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
      })
      dispatch({
        type: PRODUCT_DETAILS_RESET,
      })
    } else {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: msg,
      })
    }
  } catch (error) {}
}

export const createProductReview = (id, data) => async dispatch => {
  try {
    dispatch({
      type: CREATE_PRODUCT_REVIEW_REQUEST,
    })
    const res = await api.createProductReview(id, data)
    const {
      data: { msg },
    } = res
    if (res.status === 201) {
      dispatch({
        type: CREATE_PRODUCT_REVIEW_SUCCESS,
      })
    } else {
      dispatch({
        type: CREATE_PRODUCT_REVIEW_FAIL,
        payload: msg,
      })
    }
  } catch (error) {}
}

export const getTopProduct = () => async dispatch => {
  try {
    dispatch({ type: GET_TOP_PRODUCT_REQUEST })
    const res = await api.getTopProducts()
    if (res.status === 200) {
      const {
        data: { data },
      } = res
      dispatch({
        type: GET_TOP_PRODUCT_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({
        type: GET_TOP_PRODUCT_FAIL,
      })
    }
  } catch (error) {}
}

export const uploadImage = imageURI => async dispatch => {
  try {
    dispatch({ type: PRODUCT_IMAGE_UPLOAD_REQUEST })
    const res = await api.uploadProductImage(imageURI)
    if (res.status === 200) {
      const {
        data: { data },
      } = res
      dispatch({
        type: PRODUCT_IMAGE_UPLOAD_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({
        type: PRODUCT_IMAGE_UPLOAD_FAIL,
      })
    }
  } catch (error) {}
}

export const createProduct = () => async dispatch => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    })

    const res = await api.createProduct()
    const {
      data: { data, msg },
    } = res

    if (res.status === 201) {
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: msg,
      })
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: 'msg',
    })
  }
}
