import {UPDATE_AVATAR_REQUEST, UPDATE_AVATAR_FAILURE, UPDATE_AVATAR_SUCCESS} from '../constants/ActionTypes';
import { CALL_API } from '../middleware/api';

const updateAvatarRequest = (formData) => ({
  [CALL_API]: {
    types: [ UPDATE_AVATAR_REQUEST, UPDATE_AVATAR_SUCCESS, UPDATE_AVATAR_FAILURE ],
    endpoint: `account/avatar`,
    method: 'POST',
    body: formData
  }
});

const loadBinaryFile = file => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();

    fr.addEventListener("loadend", function (evt) {
        resolve(evt.target.result);
    });

    fr.addEventListener("error", function (err) {
        reject(err);
    });

    fr.readAsBinaryString(file);
  });
}

export const updateAvatar = (values) => (dispatch, getState) =>  {
  const file = values.avatar[0];

  var formData = new FormData();
  formData.append("avatar", file);

  dispatch(updateAvatarRequest(formData))
};
