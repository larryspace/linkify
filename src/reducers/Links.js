import uniqBy from 'lodash/uniqBy';
import union from 'lodash/union';


import {
  GET_LINKS_REQUEST, GET_LINKS_SUCCESS, GET_LINKS_FAILURE,
  POST_NEW_LINK_SUCCESS,
  VOTE_LINK_SUCCESS
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

      const {
        directory,
        page,
        sort,
        links,
      } = action.response;

      const items = state.links[directory] && state.links[directory][sort] && state.links[directory][sort].items;

      const asd = {
        page: page,
        canLoadMore: links.length < 5,
        items: uniqBy(union(page > 1 ? items || [] : [], links), 'id'),
      }

      return {
        ...state,
        links: {
          //...state.links,
          [directory]: {
            [sort]: asd
          },
        },
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
    case VOTE_LINK_SUCCESS:

      const dir = state.directory;
      const srt = state.sort;

      if(!dir || !srt){
        return {
          ...state,
        }
      }

      const bucket = state.links[dir] && state.links[dir][srt] && state.links[dir][srt];
      const itemIndex = bucket.items.findIndex(item => item.id === action.response.id);

      const newBucket = {
        ...bucket,
        items: [...bucket.items]
      }

      newBucket.items[itemIndex].upvoted = action.response.upvoted;
      newBucket.items[itemIndex].downvoted = action.response.downvoted;
      newBucket.items[itemIndex].votes = action.response.votes;

      return {
        ...state,
        links: {
          //...state.links,
          [dir]: {
            [srt]: newBucket
          },
        },
      }


    default:
      return state
  }
}
