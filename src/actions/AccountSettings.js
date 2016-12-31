import { SubmissionError } from 'redux-form';
import {
  UPDATE_AVATAR_REQUEST, UPDATE_AVATAR_FAILURE, UPDATE_AVATAR_SUCCESS,
  UPDATE_USER_REQUEST, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS
} from '../constants/ActionTypes';
import { CALL_API } from '../middleware/api';


const updateAvatarRequest = (formData) => ({
  [CALL_API]: {
    types: [ UPDATE_AVATAR_REQUEST, UPDATE_AVATAR_SUCCESS, UPDATE_AVATAR_FAILURE ],
    endpoint: `account/avatar`,
    method: 'POST',
    body: formData
  }
});

const updateUserRequest = ({username, first_name, last_name}) => ({
  [CALL_API]: {
    types: [ UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE ],
    endpoint: `account/info`,
    method: 'POST',
    body: {
      username: username,
      first_name: first_name,
      last_name: last_name
    }
  }
});

const updatePasswordRequest = ({current_password, new_password}) => ({
  [CALL_API]: {
    types: [ UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE ],
    endpoint: `account/password`,
    method: 'POST',
    body: {
      current_password,
      new_password
    }
  }
});

export const updateAvatar = (values) => (dispatch, getState) =>  {
  const file = values.avatar[0];

  var formData = new FormData();
  formData.append("avatar", file);

  return dispatch(updateAvatarRequest(formData)).then(response => {
    if(response.error){
      throw new SubmissionError(response.response);
    }
  });
};

export const updateInfo = (values) => (dispatch, getState) =>  {
  return dispatch(updateUserRequest(values)).then(response => {
    if(response.error){
      throw new SubmissionError(response.response);
    }
  });
};

export const updatePassword = (values) => (dispatch, getState) =>  {
  return dispatch(updatePasswordRequest(values)).then(response => {
    if(response.error){
      throw new SubmissionError(response.response);
    }
  });
};
