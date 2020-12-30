import {
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  DELETE_USER_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_ERROR,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  UPDATE_USER_RESET,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../types/userTypes'

const initialState = {}
export const userLoginReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: payload }
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return { loading: false, error: payload }
    case USER_ERROR:
      return { error: null }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}
export const userProfileReducer = (state = { user: null }, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_PROFILE_REQUEST:
      return { ...state, loading: true }
    case USER_PROFILE_SUCCESS:
      return { loading: false, user: payload }
    case USER_PROFILE_FAIL:
      return { ...state, loading: false, error: payload }
    case USER_ERROR:
      return { error: null }

    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const usersListReducer = (state = { users: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_ALL_USERS_REQUEST:
      return { ...state, loading: true }
    case GET_ALL_USERS_SUCCESS:
      return { loading: false, users: payload }
    case GET_ALL_USERS_FAIL:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}

export const deleteUserReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case DELETE_USER_REQUEST:
      return { ...state, loading: true }
    case DELETE_USER_SUCCESS:
      return { loading: false, success: true }
    case DELETE_USER_FAIL:
      return { ...state, loading: false, error: payload }
    case DELETE_USER_RESET:
      return {}
    default:
      return state
  }
}

export const updateUserReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true }
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, user: payload, success: true }
    case UPDATE_USER_FAIL:
      return { ...state, loading: false, error: payload }
    case UPDATE_USER_RESET:
      return { ...state, success: false, error: null }
    default:
      return state
  }
}
