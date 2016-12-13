import {combineReducers} from "redux";
import { reducer as formReducer } from 'redux-form';

import Auth from './Auth';
import Register from './Register';


export default combineReducers({
  Auth,
  Register,
  form: formReducer
});
