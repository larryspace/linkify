import { SubmissionError } from 'redux-form';
import {
  GET_LINKS_REQUEST, GET_LINKS_FAILURE, GET_LINKS_SUCCESS, GET_LINKS_REFRESH,
  POST_NEW_LINK_REQUEST, POST_NEW_LINK_FAILURE, POST_NEW_LINK_SUCCESS,
  VOTE_LINK_REQUEST, VOTE_LINK_SUCCESS, VOTE_LINK_FAILURE,
  LOAD_LINK_REQUEST, LOAD_LINK_SUCCESS, LOAD_LINK_FAILURE
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
};

const postNewLinkRequest = ({ title, link, directory }) => ({
  [CALL_API]: {
    types: [ POST_NEW_LINK_REQUEST, POST_NEW_LINK_SUCCESS, POST_NEW_LINK_FAILURE ],
    endpoint: `d/${directory}/new`,
    method: 'POST',
    body: {
      title,
      link
    }
  }
});

export const postNewLink = (values) => (dispatch, getState) =>  {
  return dispatch(postNewLinkRequest(values))
  .then(response => {
    if(response.error){
      throw new SubmissionError(response.response);
    }
  });
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
