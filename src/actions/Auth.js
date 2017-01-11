import { SubmissionError } from 'redux-form';
import {
  AUTH_USER_REQUEST, AUTH_USER_FAILURE, AUTH_USER_SUCCESS,
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE
} from '../constants/ActionTypes';
import { CALL_API, Schemas } from '../middleware/api';

const authUserRequest = () => ({
  [CALL_API]: {
    types: [ AUTH_USER_REQUEST, AUTH_USER_SUCCESS, AUTH_USER_FAILURE ],
    endpoint: `user/auth`,
    method: 'GET',
    schema: Schemas.AUTH
  }
});

export const authUser = (values) => (dispatch, getState) =>  {
  return dispatch(authUserRequest(values));
};

const loginUserRequest = ({username, password}) => ({
  [CALL_API]: {
    types: [ AUTH_USER_REQUEST, AUTH_USER_SUCCESS, AUTH_USER_FAILURE ],
    endpoint: `login`,
    method: 'POST',
    schema: Schemas.AUTH,
    body: {
      username: username,
      password: password
    }
  }
});

export const loginUser = (values) => (dispatch, getState) =>  {
  return dispatch(loginUserRequest(values))
  .then(response => {
    if(response.error){
      throw new SubmissionError(response.response);
    }
  });
};

const logoutUserRequest = () => ({
  [CALL_API]: {
    types: [ LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE ],
    endpoint: `logout`,
    method: 'GET'
  }
});

export const logoutUser = (values) => (dispatch, getState) =>  {
  return dispatch(logoutUserRequest(values));
};
