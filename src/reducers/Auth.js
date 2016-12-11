import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from '../constants/ActionTypes'

const initialState = {
  id: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  error: null,
  token: null,
  statusText: null
}


export default function Auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        isAuthenticating: true
      }

    case LOGIN_USER_SUCCESS:
      return {
        state,
        isAuthenticating: true
      }

    case LOGIN_USER_FAILURE:
      return {
        state,
        isAuthenticating: false
      }
    default:
      return state
  }
}
