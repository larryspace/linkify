import {GET_DEFAULT_DIRECTORIES_REQUEST, GET_DEFAULT_DIRECTORIES_FAILURE, GET_DEFAULT_DIRECTORIES_SUCCESS} from '../constants/ActionTypes';
import { CALL_API } from '../middleware/api';

const getDefaultDirectoriesRequest = () => ({
  [CALL_API]: {
    types: [ GET_DEFAULT_DIRECTORIES_REQUEST, GET_DEFAULT_DIRECTORIES_SUCCESS, GET_DEFAULT_DIRECTORIES_FAILURE ],
    endpoint: `directories`,
    method: 'GET'
  }
});

export const getDefaultDirectories = (values) => (dispatch, getState) =>  {
  return dispatch(getDefaultDirectoriesRequest(values));
};
