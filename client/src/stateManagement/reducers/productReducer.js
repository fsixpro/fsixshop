import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
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
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
} from '../types/productTypes'

const initialState = {
  products: [],
}
export const productListReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: payload.products,
        pages: payload.pages,
        currentPageNumber: payload.pageNumber,
      }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const productListAdminReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_LIST_ADMIN_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_ADMIN_SUCCESS:
      return {
        loading: false,
        products: payload,
      }
    case PRODUCT_LIST_ADMIN_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const productTopReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_TOP_PRODUCT_REQUEST:
      return { loading: true, products: [] }
    case GET_TOP_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: payload,
      }
    case GET_TOP_PRODUCT_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] }, loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_DETAILS_RESET:
      return { product: {} }
    default:
      return state
  }
}

export const deleteProductReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true }
    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true }
    case DELETE_PRODUCT_FAIL:
      return { ...state, loading: false, error: payload }
    case DELETE_PRODUCT_RESET:
      return {}
    default:
      return state
  }
}

export const updateProductReducer = (state = { product: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true }
    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, success: true }
    case UPDATE_PRODUCT_FAIL:
      return { loading: false, error: payload }
    case UPDATE_PRODUCT_RESET:
      return { product: {} }
    default:
      return state
  }
}

export const CreateProductReviewReducer = (state = { product: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case CREATE_PRODUCT_REVIEW_REQUEST:
      return { loading: true }
    case CREATE_PRODUCT_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case CREATE_PRODUCT_REVIEW_FAIL:
      return { loading: false, error: payload }

    default:
      return state
  }
}

export const productImageUploadReducer = (state = { image: '' }, action) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_IMAGE_UPLOAD_REQUEST:
      return { loading: true }
    case PRODUCT_IMAGE_UPLOAD_SUCCESS:
      return { loading: false, success: true, image: payload }
    case PRODUCT_IMAGE_UPLOAD_FAIL:
      return { loading: false, error: payload }

    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}
