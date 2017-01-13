import union from 'lodash/union';
import without from 'lodash/without';

const initialState = {
  ids: [],
  isFetching: false
}

const collection = ({ types, addTypes=[], removeTypes=[] }) => {
  const [ requestType, successType, failureType ] = types;
  const [ requestAddType, successAddType, failureAddType ] = addTypes;
  const [ requestRemoveType, successRemoveType, failureRemoveType ] = removeTypes;

  return (state = initialState, action) => {
    switch (action.type) {

    /*
    *
    *   Request Type
    *
    */

      case requestType:
        return { ...state,
          isFetching: true,
          ids: []
        }
      case successType:
        return { ...state,
          isFetching: false,
          ids: action.response.result
        }
      case failureType:
        return { ...state,
          isFetching: false,
          error: action.error
        }

        /*
        *
        *   Request Add Type
        *
        */

      case requestAddType:
        return { ...state,
          isFetching: true,
        }

      case successAddType:
        return { ...state,
          isFetching: false,
          ids: union(state.ids, [action.response.result]),
        }

      case failureAddType:
        return { ...state,
          sFetching: false,
          error: action.error
        }

        /*
        *
        *   Request Remove Type
        *
        */

      case requestRemoveType:
        return { ...state,
          isFetching: true,
        }
      case successRemoveType:
        return { ...state,
          isFetching: false,
          ids: without(state.ids, action.response.result),
        }
      case failureRemoveType:
        return { ...state,
          sFetching: false,
          error: action.error
        }

      default:
        return state
    }
  }
};

export default collection;
