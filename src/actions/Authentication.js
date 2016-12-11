import {LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER} from '../constants/ActionTypes';

import { CALL_API, Schemas } from '../middleware/api'


const onLoginSuccess = (token) => {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}


const  onLoginFailure = (error) => {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

const loginUserRequest = (username, password) => ({
  [CALL_API]: {
    types: [ LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE ],
    endpoint: `login`,
    method: 'POST',
    body: {
      username: username,
      passoword: password
    }
  }
});


export const loginUser = (username, password) => (dispatch, getState) =>  {
  return dispatch(loginUserRequest(username, password));
};
