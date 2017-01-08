const initialState = {
  ids: [],
  isFetching: false
}

const collection = ({ types }) => {
  const [ requestType, successType, failureType ] = types;

  return (state = initialState, action) => {
    switch (action.type) {
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
      default:
        return state
    }
  }
};

export default collection;
