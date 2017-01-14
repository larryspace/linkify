import { SubmissionError } from 'redux-form';
import {
  GET_LINKS_REQUEST, GET_LINKS_FAILURE, GET_LINKS_SUCCESS, GET_LINKS_REFRESH,
  POST_NEW_LINK_REQUEST, POST_NEW_LINK_FAILURE, POST_NEW_LINK_SUCCESS,
  VOTE_LINK_REQUEST, VOTE_LINK_SUCCESS, VOTE_LINK_FAILURE,
  LOAD_LINK_REQUEST, LOAD_LINK_SUCCESS, LOAD_LINK_FAILURE,
  EDIT_LINK_REQUEST, EDIT_LINK_SUCCESS, EDIT_LINK_FAILURE,
  DELETE_LINK_REQUEST, DELETE_LINK_SUCCESS, DELETE_LINK_FAILURE
} from '../constants/ActionTypes';
import { CALL_API, Schemas } from '../middleware/api';

import { toggleLoginModal } from './modals';

const loadLinkRequest = ({ link }) => ({
  [CALL_API]: {
    types: [ LOAD_LINK_REQUEST, LOAD_LINK_SUCCESS, LOAD_LINK_FAILURE ],
    endpoint: `d/link/${link}`,
    method: 'GET',
    schema: Schemas.LINK
  }
});

export const loadLink = ({ link }, refresh) => (dispatch, getState) =>  {
  const linkItem = getState().entities.links[link];
  if(linkItem && !refresh){
    return;
  }

  return dispatch(loadLinkRequest({ link }));
};
/*
const loadLinksRequest = ({ directory, page, sortBy }) => ({
  directory,
  [CALL_API]: {
    types: [ GET_LINKS_REQUEST, GET_LINKS_SUCCESS, GET_LINKS_FAILURE ],
    endpoint: `d/${directory}/${page}/${sortBy}`,
    method: 'GET',
    schema: Schemas.LINK_ARRAY
  }
});

export const loadLinks = ({ directory, sortBy }, refresh) => (dispatch, getState) =>  {
  const {
    [directory]: {
      isFetching,
      pageCount = 1
    } = {}
  } = getState().paginations.linksByDirectory || { [directory]: {} };

  if(isFetching){
    return;
  }

  let page = pageCount;

  if(refresh){
    page = 1;
    dispatch({
      type: GET_LINKS_REFRESH,
      directory
    });
  }

  return dispatch(loadLinksRequest({ directory, page, sortBy }));
};*/

const loadLinksRequest = ({ id, type, sort, page }) => ({
  id: type + id,
  [CALL_API]: {
    types: [ GET_LINKS_REQUEST, GET_LINKS_SUCCESS, GET_LINKS_FAILURE ],
    endpoint: `links/${type}/${id}/${sort}/${page}`,
    method: 'GET',
    schema: Schemas.LINK_ARRAY
  }
});

export const loadLinks = ({ id, type, sort }, refresh) => (dispatch, getState) =>  {
  const idType = type + id;
  const {
    [idType]: {
      isFetching,
      pageCount = 1
    } = {}
  } = getState().paginations.links || { [idType]: {} };

  if(isFetching){
    return;
  }

  let page = pageCount;

  if(refresh){
    page = 1;
    dispatch({
      type: GET_LINKS_REFRESH,
      id: idType,
    });
  }

  return dispatch(loadLinksRequest({ id, type, sort, page }));
};

const postNewLinkRequest = ({ title, link, description, directory }) => ({
  [CALL_API]: {
    types: [ POST_NEW_LINK_REQUEST, POST_NEW_LINK_SUCCESS, POST_NEW_LINK_FAILURE ],
    endpoint: `d/${directory}/new`,
    method: 'POST',
    schema: Schemas.LINK,
    body: {
      title,
      link,
      description
    }
  }
});

export const postNewLink = (values) => (dispatch, getState) =>  {
  return dispatch(postNewLinkRequest(values))
  .then(response => {
    if(response.error){
      throw new SubmissionError(response.response);
    }
    return response;
  });
};

const editLinkRequest = ({ id, description }) => ({
  [CALL_API]: {
    types: [ EDIT_LINK_REQUEST, EDIT_LINK_SUCCESS, EDIT_LINK_FAILURE ],
    endpoint: `d/link/${id}/edit`,
    method: 'POST',
    schema: Schemas.LINK,
    body: {
      description
    }
  }
});

export const editLink = (values) => (dispatch, getState) =>  {

  if(!getState().Auth.user){
    return toggleLoginModal()(dispatch, getState);
  }

  return dispatch(editLinkRequest(values))
  .then(response => {
    if(response.error){
      throw new SubmissionError(response.response);
    }
  });
};


const deleteLinkRequest = ({ id }) => ({
  [CALL_API]: {
    types: [ DELETE_LINK_REQUEST, DELETE_LINK_SUCCESS, DELETE_LINK_FAILURE ],
    endpoint: `d/link/${id}/delete`,
    method: 'POST',
    schema: Schemas.LINK,
    body: {}
  }
});

export const deleteLink = (values) => (dispatch, getState) =>  {

  if(!getState().Auth.user){
    return toggleLoginModal()(dispatch, getState);
  }

  return dispatch(deleteLinkRequest(values));
};

const voteLinkRequest = ({ id, vote }) => ({
  [CALL_API]: {
    types: [ VOTE_LINK_REQUEST, VOTE_LINK_SUCCESS, VOTE_LINK_FAILURE ],
    endpoint: `d/link/${id}/${vote}`,
    method: 'POST',
    schema: Schemas.LINK,
    body: {}
  }
});

export const voteLink = (values) => (dispatch, getState) =>  {

  if(!getState().Auth.user){
    return toggleLoginModal()(dispatch, getState);
  }

  return dispatch(voteLinkRequest(values));
};
