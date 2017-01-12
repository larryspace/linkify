import {
  TOGGLE_MODAL
} from '../constants/ActionTypes';

const initialState = {
  show: false,
}

const modal = name => {
  return (state = initialState, action) => {
    switch (action.type) {
      case TOGGLE_MODAL:
        if(action.name !== name){
          return state;
        }

        return { ...state,
          ...action,
          show: !state.show,
        }
      default:
        return state
    }
  }
};

export default modal;
