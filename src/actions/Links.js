import {GET_LINKS_REQUEST, GET_LINKS_FAILURE, GET_LINKS_SUCCESS} from '../constants/ActionTypes';
import { CALL_API } from '../middleware/api';

const getLinksRequest = ({ directory }) => ({
  [CALL_API]: {
    types: [ GET_LINKS_REQUEST, GET_LINKS_SUCCESS, GET_LINKS_FAILURE ],
    endpoint: `d/${directory}`,
    method: 'GET'
  }
});

export const getLinks = (values) => (dispatch, getState) =>  {

  //const links = getState

  return dispatch(getLinksRequest(values));
};
