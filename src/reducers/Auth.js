import {
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  AUTH_USER_REQUEST, AUTH_USER_SUCCESS, AUTH_USER_FAILURE,
  LOGOUT_USER_REQUEST
} from '../constants/ActionTypes'

const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthenticating: false,
  error: null,
  token: null
}

export default function Auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER_REQUEST:
      return {
        ...state,
        user: null,
        isAuthenticating: true,
        error: null
      }

    case AUTH_USER_SUCCESS:
      const auth = action.response.entities.auth[action.response.result];
      if(auth.token){
        localStorage.setItem('token', auth.token);
      }

      return {
        ...state,
        user: auth.user,
        isAuthenticated: true,
        isAuthenticating: false,
        error: null
      }

    case AUTH_USER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isAuthenticating: false,
        error: action.error
      }

    case LOGOUT_USER_REQUEST:
      localStorage.removeItem('token');
      return {
        ...initialState
      }
    default:
      return state
  }
}
