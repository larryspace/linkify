import {
  LOAD_USER_REQUEST, LOAD_USER_FAILURE, LOAD_USER_SUCCESS
} from '../constants/ActionTypes';

import { CALL_API, Schemas } from '../middleware/api';

const loadUserRequest = ({ id }) => ({
  [CALL_API]: {
    types: [ LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE ],
    endpoint: `user/${id}`,
    method: 'GET',
    schema: Schemas.USER
  }
});

export const loadUser = ({ id }, refresh) => (dispatch, getState) =>  {
  const userItem = getState().entities.users[id];
  if(userItem && !refresh){
    return;
  }

  return dispatch(loadUserRequest({ id }));
};
