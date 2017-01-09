import {
  LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE,
} from '../constants/ActionTypes';
import { CALL_API, Schemas } from '../middleware/api';

const loadCommentsRequest = ({ link }) => ({
  [CALL_API]: {
    types: [ LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE ],
    endpoint: `d/link/${link}/comments`,
    method: 'GET',
    schema: Schemas.COMMENT_ARRAY
  }
});

export const loadComments = (values) => (dispatch, getState) =>  {
  return dispatch(loadCommentsRequest(values));
};
