import {
  GET_DEFAULT_DIRECTORIES_REQUEST, GET_DEFAULT_DIRECTORIES_FAILURE, GET_DEFAULT_DIRECTORIES_SUCCESS,
  LOAD_DIRECTORY_REQUEST, LOAD_DIRECTORY_SUCCESS, LOAD_DIRECTORY_FAILURE,
  SUBSCRIBE_DIRECTORY_REQUEST, SUBSCRIBE_DIRECTORY_SUCCESS, SUBSCRIBE_DIRECTORY_FAILURE,
  UNSUBSCRIBE_DIRECTORY_REQUEST, UNSUBSCRIBE_DIRECTORY_SUCCESS, UNSUBSCRIBE_DIRECTORY_FAILURE,
  GET_SUBSCRIBED_DIRECTORIES_REQUEST, GET_SUBSCRIBED_DIRECTORIES_FAILURE, GET_SUBSCRIBED_DIRECTORIES_SUCCESS,
  SET_DIRECTORY_SORT_OPTION
} from '../constants/ActionTypes';
import { CALL_API, Schemas } from '../middleware/api';

import { toggleLoginModal } from './modals';

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

const getSubscribedDirectoriesRequest = () => ({
  [CALL_API]: {
    types: [ GET_SUBSCRIBED_DIRECTORIES_REQUEST, GET_SUBSCRIBED_DIRECTORIES_SUCCESS, GET_SUBSCRIBED_DIRECTORIES_FAILURE ],
    endpoint: `directories/subscribed`,
    method: 'GET',
    schema: Schemas.DIRECTORY_ARRAY
  }
});

export const getSubscribedDirectories = (values) => (dispatch, getState) =>  {
  return dispatch(getSubscribedDirectoriesRequest(values));
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

const subscribeDirectoryRequest = ({ directory }) => ({
  [CALL_API]: {
    types: [ SUBSCRIBE_DIRECTORY_REQUEST, SUBSCRIBE_DIRECTORY_SUCCESS, SUBSCRIBE_DIRECTORY_FAILURE ],
    endpoint: `d/${directory}/subscribe`,
    method: 'POST',
    schema: Schemas.DIRECTORY
  }
});

const unsubscribeDirectoryRequest = ({ directory }) => ({
  [CALL_API]: {
    types: [ UNSUBSCRIBE_DIRECTORY_REQUEST, UNSUBSCRIBE_DIRECTORY_SUCCESS, UNSUBSCRIBE_DIRECTORY_FAILURE ],
    endpoint: `d/${directory}/unsubscribe`,
    method: 'POST',
    schema: Schemas.DIRECTORY
  }
});

export const subscribeDirectory = ({ directory }) => (dispatch, getState) =>  {

  if(!getState().Auth.user){
    return toggleLoginModal()(dispatch, getState);
  }

  const {
    subscribedDirectories
  } = getState().collections;

  const subscribed = subscribedDirectories.ids.find(id => id === directory) !== undefined;

  if(subscribedDirectories.isFetching){
    return;
  }

  if(subscribed){
    return dispatch(unsubscribeDirectoryRequest({ directory }));
  }else{
    return dispatch(subscribeDirectoryRequest({ directory }));
  }
};

export const setDirectorySortOption = (sortValue) => (dispatch, getState) =>  {
  return dispatch({
    type: SET_DIRECTORY_SORT_OPTION,
    sortBy: sortValue
  });
};
