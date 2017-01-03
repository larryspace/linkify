import { SubmissionError } from 'redux-form';
import {
  GET_LINKS_REQUEST, GET_LINKS_FAILURE, GET_LINKS_SUCCESS,
  POST_NEW_LINK_REQUEST, POST_NEW_LINK_FAILURE, POST_NEW_LINK_SUCCESS
} from '../constants/ActionTypes';
import { CALL_API } from '../middleware/api';

const getLinksRequest = ({ directory }) => ({
  [CALL_API]: {
    types: [ GET_LINKS_REQUEST, GET_LINKS_SUCCESS, GET_LINKS_FAILURE ],
    endpoint: `d/${directory}`,
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

export const loadLinks = (values) => (dispatch, getState) =>  {
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
