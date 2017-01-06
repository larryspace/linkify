import {
  GET_DEFAULT_DIRECTORIES_REQUEST, GET_DEFAULT_DIRECTORIES_SUCCESS, GET_DEFAULT_DIRECTORIES_FAILURE,
  SET_DIRECTORY_SORT_OPTION
} from '../constants/ActionTypes';

const initialState = {
  default: [],
  activeDirectory: null,
  sortBy: 'hot',
  loading: false,
  error: null
}


export default function Register(state = initialState, action) {
  switch (action.type) {
    case GET_DEFAULT_DIRECTORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case GET_DEFAULT_DIRECTORIES_SUCCESS:
      return {
        ...state,
        default: action.response,
        loading: false,
        error: null
      }

    case GET_DEFAULT_DIRECTORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case SET_DIRECTORY_SORT_OPTION:
      return {
        ...state,
        sortBy: action.sortBy
      }

    default:
      return state
  }
}
