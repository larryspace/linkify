import {LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER} from '../constants/ActionTypes';

import { CALL_API } from '../middleware/api'

const loginUserRequest = (username, password) => ({
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


export const loginUser = (username, password) => (dispatch, getState) =>  {
  return dispatch(loginUserRequest(username, password));
};
