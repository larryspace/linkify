import { SubmissionError } from 'redux-form';
import {
  LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE,
  NEW_COMMENT_REQUEST, NEW_COMMENT_SUCCESS, NEW_COMMENT_FAILURE
} from '../constants/ActionTypes';
import { CALL_API, Schemas } from '../middleware/api';

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
    endpoint: `comments/${id}/edit`,
    method: 'POST',
    schema: Schemas.COMMENT,
    body: {
      content
    }
  }
});

export const editComment = ({id, content}) => (dispatch, getState) =>  {
  return dispatch(editCommentRequest({id, content}))
  .then(response => {
    if(response.error){
      throw new SubmissionError(response.response);
    }
  });
};
