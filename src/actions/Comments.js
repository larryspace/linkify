import { SubmissionError } from 'redux-form';
import {
  LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE,
  NEW_COMMENT_REQUEST, NEW_COMMENT_SUCCESS, NEW_COMMENT_FAILURE,
  VOTE_COMMENT_REQUEST, VOTE_COMMENT_SUCCESS, VOTE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE
} from '../constants/ActionTypes';
import { CALL_API, Schemas } from '../middleware/api';

import { toggleLoginModal } from './modals';

const loadCommentsRequest = ({ link }) => ({
  link,
  [CALL_API]: {
    types: [ LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE ],
    endpoint: `link/${link}/comments`,
    method: 'GET',
    schema: Schemas.COMMENT_ARRAY
  }
});

export const loadComments = ({link}) => (dispatch, getState) =>  {
  link = link + '';
  return dispatch(loadCommentsRequest({link}));
};

const newCommentRequest = ({ link, parent, content }) => ({
  link,
  [CALL_API]: {
    types: [ LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE ],
    endpoint: `link/${link}/comment`,
    method: 'POST',
    schema: Schemas.COMMENT,
    body: {
      parent,
      content
    }
  }
});

export const newComment = ({link, parent, content}) => (dispatch, getState) =>  {

  if(!getState().Auth.user){
    return toggleLoginModal()(dispatch, getState);
  }

  return dispatch(newCommentRequest({link, parent, content}))
  .then(response => {
    if(response.error){
      throw new SubmissionError(response.response);
    }
  });
};

const editCommentRequest = ({id, content}) => ({
  [CALL_API]: {
    types: [ NEW_COMMENT_REQUEST, NEW_COMMENT_SUCCESS, NEW_COMMENT_FAILURE ],
    endpoint: `comment/${id}/edit`,
    method: 'POST',
    schema: Schemas.COMMENT,
    body: {
      content
    }
  }
});

export const editComment = ({id, content}) => (dispatch, getState) =>  {

  if(!getState().Auth.user){
    return toggleLoginModal()(dispatch, getState);
  }

  return dispatch(editCommentRequest({id, content}))
  .then(response => {
    if(response.error){
      throw new SubmissionError(response.response);
    }
  });
};


const voteCommentRequest = ({ id, vote }) => ({
  [CALL_API]: {
    types: [ VOTE_COMMENT_REQUEST, VOTE_COMMENT_SUCCESS, VOTE_COMMENT_FAILURE ],
    endpoint: `comment/${id}/${vote}`,
    method: 'POST',
    schema: Schemas.COMMENT,
    body: {}
  }
});

export const voteComment = (values) => (dispatch, getState) =>  {

  if(!getState().Auth.user){
    return toggleLoginModal()(dispatch, getState);
  }

  return dispatch(voteCommentRequest(values));
};

const deleteCommentRequest = ({ id }) => ({
  [CALL_API]: {
    types: [ DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE ],
    endpoint: `comment/${id}/delete`,
    method: 'POST',
    schema: Schemas.COMMENT,
    body: {}
  }
});

export const deleteComment = (values) => (dispatch, getState) =>  {
  return dispatch(deleteCommentRequest(values));
};
