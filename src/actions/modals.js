import {
  TOGGLE_MODAL
} from '../constants/ActionTypes';

const toggleModal = (name, props={}) => ({
  type: TOGGLE_MODAL,
  name,
  ...props,
});

export const toggleLoginModal = () => (dispatch, getState) =>  {
  return dispatch(toggleModal('login'));
};
