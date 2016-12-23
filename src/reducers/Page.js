import { SET_PAGE_INFO } from '../constants/ActionTypes'

const initialState = {
  title: 'Default'
}

export default function PageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAGE_INFO:
      return {
        ...state,
        ...action.page
      }

    default:
      return state
  }
}
