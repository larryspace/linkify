import {LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_REQUEST,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS} from '../constants/ActionTypes';

import { CALL_API } from '../middleware/api';

const registerUserRequest = ({username, email, password}) => ({
  [CALL_API]: {
    types: [ REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE ],
    endpoint: `register`,
    method: 'POST',
    body: {
      username: username,
      password: password,
      email: email
    }
  }
});

const loginUserRequest = ({username, password}) => ({
  [CALL_API]: {
    types: [ LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE ],
    endpoint: `login`,
    method: 'POST',
    body: {
      username: username,
      password: password
    }
  }
});


export const loginUser = (values) => (dispatch, getState) =>  {
  return dispatch(loginUserRequest(values));
};

export const registerUser = (values) => (dispatch, getState) =>  {
  return dispatch(registerUserRequest(values));
};
