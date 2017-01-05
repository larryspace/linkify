import {combineReducers} from "redux";


import Auth from './Auth';
import Register from './Register';
import Page from './Page';
import Directories from './Directories';
import Links from './Links';
import formReducer from './FormReducer';


export default combineReducers({
  Auth,
  Register,
  Page,
  Directories,
  Links,
  form: formReducer
});
