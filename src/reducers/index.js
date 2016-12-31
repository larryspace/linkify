import {combineReducers} from "redux";


import Auth from './Auth';
import Register from './Register';
import Page from './Page';
import formReducer from './FormReducer';


export default combineReducers({
  Auth,
  Register,
  Page,
  form: formReducer
});
