import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS } from '../constants/ActionTypes'

const initialState = {
  userInfo: null,
  isAuthenticated: false,
  isAuthenticating: false,
  error: null,
  token: null
}


export default function Auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        ...action.response,
        isAuthenticated: true,
        isAuthenticating: false,
        error: null
      }

    case LOGIN_USER_REQUEST || AUTH_USER_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
        error: null
      }

    case LOGIN_USER_SUCCESS:
      localStorage.setItem('token', action.response.token);
      return {
        ...state,
        ...action.response,
        isAuthenticated: true,
        isAuthenticating: false,
        error: null
      }

    case LOGIN_USER_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        userInfo: null,
        isAuthenticated: false,
        isAuthenticating: false,
        error: action.error
      }

    case LOGOUT_USER:
      localStorage.removeItem('token');
      return {
        ...initialState
      }
    default:
      return state
  }
}
