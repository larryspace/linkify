import { SET_PAGE_INFO } from '../constants/ActionTypes';

export const setPageInfo = ({ title, directory }) => (dispatch, getState) =>  {
  return dispatch({
    type: SET_PAGE_INFO,
    page: {
      title,
      directory
    }
  });
};
