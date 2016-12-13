import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE} from '../constants/ActionTypes'

const initialState = {
  registered: false,
  isRegistering: false,
  error: null,
}


export default function Register(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        isRegistering: true,
        error: null
      }

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isRegistering: false,
        error: null
      }

    case REGISTER_USER_FAILURE:
      return {
        ...state,
        isRegistering: false,
        error: action.error
      }

    default:
      return state
  }
}
