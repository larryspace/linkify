import {AUTH_USER_REQUEST, AUTH_USER_FAILURE, AUTH_USER_SUCCESS} from '../constants/ActionTypes';
import { CALL_API } from '../middleware/api';

const authUserRequest = () => ({
  [CALL_API]: {
    types: [ AUTH_USER_REQUEST, AUTH_USER_SUCCESS, AUTH_USER_FAILURE ],
    endpoint: `user/auth`,
    method: 'GET'
  }
});

export const authUser = (values) => (dispatch, getState) =>  {
  return dispatch(authUserRequest(values));
};
