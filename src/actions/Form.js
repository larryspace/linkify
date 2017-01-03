import { submit } from 'redux-form';

export const submitForm = (name) => (dispatch, getState) =>  {
  return dispatch(submit(name));
};
