import {combineReducers} from "redux";
import { reducer as formReducer } from 'redux-form';

import Auth from './Auth';
import Register from './Register';
import Page from './Page';


export default combineReducers({
  Auth,
  Register,
  Page,
  form: formReducer
});
