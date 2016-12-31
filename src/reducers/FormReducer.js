import { reducer as formReducer } from 'redux-form';

import { LOGIN_USER_FAILURE } from '../constants/ActionTypes';

const loginForm = (state, action) => {
  switch (action.type) {
  case LOGIN_USER_FAILURE:
    return {
      ...state,
      values: {
        ...state.values,
        password: undefined // <----- clear password value
      },
      fields: {
        ...state.fields,
        password: undefined // <----- clear field state, too (touched, etc.)
      }
    };
  default:
    return state;
  }
};

export default formReducer.plugin({
  loginForm
});
