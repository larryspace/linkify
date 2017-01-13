import { SubmissionError } from 'redux-form';
import {
  REGISTER_USER_REQUEST, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS
} from '../constants/ActionTypes';

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

export const registerUser = (values) => (dispatch, getState) =>  {
  return dispatch(registerUserRequest(values))
  .then(response => {
    if(response.error){
      throw new SubmissionError(response.response);
    }
  });
};
