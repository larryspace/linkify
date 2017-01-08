import uniqBy from 'lodash/uniqBy';
import union from 'lodash/union';


import {
  GET_LINKS_REQUEST, GET_LINKS_SUCCESS, GET_LINKS_FAILURE,
  POST_NEW_LINK_SUCCESS,
  VOTE_LINK_SUCCESS,
  LOAD_LINK_REQUEST, LOAD_LINK_SUCCESS, LOAD_LINK_FAILURE,
  ON_REFRESH_LINKS
} from '../constants/ActionTypes';

const initialState = {
  links: [],
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

      const {
        directory,
        page,
        sort,
        links,
      } = action.response;

      return {
        ...state,
        page: page,
        links: uniqBy(union(page > 1 ? state.links : [], links), 'id'),
        canLoadMore: links.length === 10,
        directory,
        sort,
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

    case LOAD_LINK_REQUEST:
      return {
        ...state,
        loadingLink: true
      }
    case LOAD_LINK_SUCCESS:
      return {
        ...state,
        loadingLink: false,
        links: uniqBy(union(state.links, [action.response]), 'id')
      }
    case LOAD_LINK_FAILURE:
      return {
        ...state,
        loadingLink: false
      }

    case ON_REFRESH_LINKS:
      return {
        ...state,
        links: []
      }

    case VOTE_LINK_SUCCESS:

      const dir = state.directory;
      const srt = state.sort;

      const newLinks = state.links;
      const itemIndex = newLinks.findIndex(item => item.id === action.response.id);

      if(itemIndex === -1){
        return {
          ...state,
        }
      }

      newLinks[itemIndex].upvoted = action.response.upvoted;
      newLinks[itemIndex].downvoted = action.response.downvoted;
      newLinks[itemIndex].votes = action.response.votes;

      return {
        ...state,
        links: [...newLinks],
      }


    default:
      return state
  }
}
