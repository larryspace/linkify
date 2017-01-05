import { SubmissionError } from 'redux-form';
import {
  GET_LINKS_REQUEST, GET_LINKS_FAILURE, GET_LINKS_SUCCESS,
  POST_NEW_LINK_REQUEST, POST_NEW_LINK_FAILURE, POST_NEW_LINK_SUCCESS,
  VOTE_LINK_REQUEST, VOTE_LINK_SUCCESS, VOTE_LINK_FAILURE
} from '../constants/ActionTypes';
import { CALL_API } from '../middleware/api';

const getLinksRequest = ({ directory, page }) => ({
  [CALL_API]: {
    types: [ GET_LINKS_REQUEST, GET_LINKS_SUCCESS, GET_LINKS_FAILURE ],
    endpoint: `d/${directory}/${page}`,
    method: 'GET'
  }
});

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

const voteLinkRequest = ({ id, vote }) => ({
  [CALL_API]: {
    types: [ VOTE_LINK_REQUEST, VOTE_LINK_SUCCESS, VOTE_LINK_FAILURE ],
    endpoint: `d/link/${id}/${vote}`,
    method: 'POST',
    body: {}
  }
});

export const voteLink = (values) => (dispatch, getState) =>  {
  return dispatch(voteLinkRequest(values));
};

export const loadLinks = (values, loadMore) => (dispatch, getState) =>  {

  const {
    page = 0,
    items,
  } = getState().Links.links[values.directory] || {};


  if(items && !loadMore || getState().Links.loading){
    return;
  }

  values.page = page + 1;

  return dispatch(getLinksRequest(values));
};

export const postNewLink = (values) => (dispatch, getState) =>  {
  return dispatch(postNewLinkRequest(values))
  .then(response => {
    if(response.error){
      throw new SubmissionError(response.response);
    }
  });
};
