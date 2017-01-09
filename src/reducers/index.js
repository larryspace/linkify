import {combineReducers} from "redux";
import * as ActionTypes from '../constants/ActionTypes';


import Auth from './Auth';
import Register from './Register';
import Page from './Page';
import Directories from './Directories';
import formReducer from './FormReducer';

import collectionReducer from './collection';
import paginationReducer from './pagination';
import entityReducer from './entity';
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

const entity = combineReducers({
  link: entityReducer({
    types: [
      ActionTypes.LOAD_LINK_REQUEST,
      ActionTypes.LOAD_LINK_SUCCESS,
      ActionTypes.LOAD_LINK_FAILURE,
    ]
  }),
  directory: entityReducer({
    types: [
      ActionTypes.LOAD_DIRECTORY_REQUEST,
      ActionTypes.LOAD_DIRECTORY_SUCCESS,
      ActionTypes.LOAD_DIRECTORY_FAILURE,
    ]
  })
});

export default combineReducers({
  Auth,
  Register,
  Page,
  Directories,
  entity,
  entities,
  collections,
  paginations,
  form: formReducer
});
