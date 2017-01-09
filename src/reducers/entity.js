const initialState = {
  isFetching: false
}

const entity = ({ types }) => {
  const [ requestType, successType, failureType ] = types;

  return (state = initialState, action) => {
    switch (action.type) {
      case requestType:
        return { ...state,
          isFetching: true
        }
      case successType:
        return { ...state,
          isFetching: false
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

export default entity;
