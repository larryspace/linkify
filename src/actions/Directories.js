import {
  GET_DEFAULT_DIRECTORIES_REQUEST, GET_DEFAULT_DIRECTORIES_FAILURE, GET_DEFAULT_DIRECTORIES_SUCCESS,
  LOAD_DIRECTORY_REQUEST, LOAD_DIRECTORY_SUCCESS, LOAD_DIRECTORY_FAILURE,
  SET_DIRECTORY_SORT_OPTION
} from '../constants/ActionTypes';
import { CALL_API, Schemas } from '../middleware/api';

const getDefaultDirectoriesRequest = () => ({
  [CALL_API]: {
    types: [ GET_DEFAULT_DIRECTORIES_REQUEST, GET_DEFAULT_DIRECTORIES_SUCCESS, GET_DEFAULT_DIRECTORIES_FAILURE ],
    endpoint: `directories`,
    method: 'GET',
    schema: Schemas.DIRECTORY_ARRAY
  }
});

export const getDefaultDirectories = (values) => (dispatch, getState) =>  {
  return dispatch(getDefaultDirectoriesRequest(values));
};

const loadDirectoryRequest = ({ directory }) => ({
  [CALL_API]: {
    types: [ LOAD_DIRECTORY_REQUEST, LOAD_DIRECTORY_SUCCESS, LOAD_DIRECTORY_FAILURE ],
    endpoint: `d/${directory}`,
    method: 'GET',
    schema: Schemas.DIRECTORY
  }
});

export const loadDirectory = ({ directory }) => (dispatch, getState) =>  {

  const directoryItem = getState().entities.directories[directory];
  if(directoryItem){
    return Promise.resolve();
  }

  return dispatch(loadDirectoryRequest({ directory }));
};


export const setDirectorySortOption = (sortValue) => (dispatch, getState) =>  {
  return dispatch({
    type: SET_DIRECTORY_SORT_OPTION,
    sortBy: sortValue
  });
};
