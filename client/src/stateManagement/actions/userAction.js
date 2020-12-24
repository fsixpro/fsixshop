import Apicall from '../../network/ApiCall'
import {
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  DELETE_USER_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  USER_ERROR,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../types/userTypes'
const api = new Apicall()
export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })
    const res = await api.register({ name, email, password })
    const { data } = res
    if (res.status === 200) {
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data.data,
      })
      localStorage.setItem('userInfo', JSON.stringify(data.data))
    } else {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: data.msg,
      })
      setTimeout(() => {
        dispatch({
          type: USER_ERROR,
        })
      }, 2500)
    }
  } catch (error) {
    console.log(error)
  }
}

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    const res = await api.signin({ email, password })

    const { data } = res

    if (res.status === 200) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.data,
      })
      localStorage.setItem('userInfo', JSON.stringify(data.data))
    } else {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: data.msg,
      })
      setTimeout(() => {
        dispatch({
          type: USER_ERROR,
        })
      }, 2500)
    }
  } catch (error) {
    console.log(error.response)
  }
}

export const getUserProfile = () => async dispatch => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST })
    const res = await api.getuser()
    const {
      data: { data, msg },
    } = res

    if (res.status === 200) {
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({
        type: USER_PROFILE_FAIL,
        payload: msg,
      })
    }
  } catch (error) {
    console.log(error.response)
  }
}

export const getusers = () => async dispatch => {
  try {
    dispatch({
      type: GET_ALL_USERS_REQUEST,
    })
    const res = await api.getAllUsers()
    const {
      data: { data, msg },
    } = res
    if (res.status === 200) {
      dispatch({
        type: GET_ALL_USERS_SUCCESS,
        payload: data,
      })
    } else {
      dispatch({
        type: GET_ALL_USERS_FAIL,
        payload: msg,
      })
    }
  } catch (error) {
    console.log(error.response)
  }
}

export const userDelete = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    })
    const res = await api.deleteUser(id)
    const {
      data: { msg },
    } = res
    if (res.status === 200) {
      dispatch({
        type: DELETE_USER_SUCCESS,
      })
      dispatch({
        type: DELETE_USER_RESET,
      })
    } else {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: msg,
      })
    }
  } catch (error) {}
}
export const logout = () => dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({
    type: USER_LOGOUT,
  })
}
