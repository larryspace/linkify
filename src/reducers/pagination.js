//Derived from: https://github.com/reactjs/redux/blob/master/examples/real-world/src/reducers/paginate.js
import union from 'lodash/union';

const initialState = {
  isFetching: false,
  pageCount: 1,
  ids: []
};

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
const paginate = ({ types, mapActionToKey }) => {
  const [ requestType, successType, failureType, refreshType ] = types;

  const updatePagination = (state = initialState, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        }
      case successType:
        const result = typeof action.response.result === "object" ? action.response.result : [action.response.result];

        let newIds;
        if(typeof action.response.result === "object"){
          newIds = union(state.ids, result);
        }else{
          newIds = union(result, state.ids);
        }

        return {
          ...state,
          isFetching: false,
          ids: newIds,
          pageCount: state.pageCount + 1
        }
      case failureType:
        return {
          ...state,
          isFetching: false
        }
      case refreshType:
        return {
          ...state,
          ids: [],
          pageCount: 1
        }
      default:
        return state
    }
  }

  return (state = {}, action) => {
    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
      case refreshType:
        const key = mapActionToKey(action) + '';
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.')
        }
        return { ...state,
          [key]: updatePagination(state[key], action)
        }
      default:
        return state
    }
  }
}

export default paginate
