import {combineReducers} from "redux";
import * as ActionTypes from '../constants/ActionTypes';


import Auth from './Auth';
import Register from './Register';
import Page from './Page';
import Directories from './Directories';
import Links from './Links';
import formReducer from './FormReducer';

import collectionReducer from './collection';
import paginationReducer from './pagination';
import entities from './entities';

const collections = combineReducers({
  defaultDirectories: collectionReducer({
    types: [
      ActionTypes.GET_DEFAULT_DIRECTORIES_REQUEST,
      ActionTypes.GET_DEFAULT_DIRECTORIES_SUCCESS,
      ActionTypes.GET_DEFAULT_DIRECTORIES_FAILURE
    ]
  }),
  subscribedDirectories: collectionReducer({
    types: [
      ActionTypes.GET_DEFAULT_DIRECTORIES_REQUEST,
      ActionTypes.GET_DEFAULT_DIRECTORIES_SUCCESS,
      ActionTypes.GET_DEFAULT_DIRECTORIES_FAILURE
    ]
  }),
});

const paginations = combineReducers({
  linksByDirectory: paginationReducer({
    mapActionToKey: action => action.directory,
    types: [
      ActionTypes.GET_LINKS_REQUEST,
      ActionTypes.GET_LINKS_SUCCESS,
      ActionTypes.GET_LINKS_FAILURE,
      ActionTypes.GET_LINKS_REFRESH
    ]
  })
});

export default combineReducers({
  Auth,
  Register,
  Page,
  Directories,
  //Links,
  entities,
  collections,
  paginations,
  form: formReducer
});
