import uniqBy from 'lodash/uniqBy';
import union from 'lodash/union';


import {
  GET_LINKS_REQUEST, GET_LINKS_SUCCESS, GET_LINKS_FAILURE,
  POST_NEW_LINK_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
  links: {},
  loading: false,
  error: null
}


export default function Links(state = initialState, action) {
  switch (action.type) {
    case GET_LINKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case GET_LINKS_SUCCESS:

      const items = state.links[action.response.directory] && state.links[action.response.directory].items;

      const asd = {
        page: action.response.page,
        canLoadMore: action.response.links.length < 5,
        items: uniqBy(union(items || [], action.response.links), 'id'),
      }

      return {
        ...state,
        links: {
          ...state.links,
          [action.response.directory]: asd,
        },
        loading: false,
        error: null
      }

    case GET_LINKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case POST_NEW_LINK_SUCCESS:



      return {
        ...state,
      }

    default:
      return state
  }
}
