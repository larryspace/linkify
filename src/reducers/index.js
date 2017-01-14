import {combineReducers} from "redux";
import * as ActionTypes from '../constants/ActionTypes';


import Auth from './Auth';
import Register from './Register';
import Page from './Page';
import Directories from './Directories';
import formReducer from './FormReducer';

import modalReducer from './modal';
import collectionReducer from './collection';
import paginationReducer from './pagination';
import entityReducer from './entity';
import entities from './entities';

const modals = combineReducers({
  login: modalReducer('login')
});

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
      ActionTypes.GET_SUBSCRIBED_DIRECTORIES_REQUEST,
      ActionTypes.GET_SUBSCRIBED_DIRECTORIES_SUCCESS,
      ActionTypes.GET_SUBSCRIBED_DIRECTORIES_FAILURE
    ],
    addTypes: [
      ActionTypes.SUBSCRIBE_DIRECTORY_REQUEST,
      ActionTypes.SUBSCRIBE_DIRECTORY_SUCCESS,
      ActionTypes.SUBSCRIBE_DIRECTORY_FAILURE
    ],
    removeTypes: [
      ActionTypes.UNSUBSCRIBE_DIRECTORY_REQUEST,
      ActionTypes.UNSUBSCRIBE_DIRECTORY_SUCCESS,
      ActionTypes.UNSUBSCRIBE_DIRECTORY_FAILURE
    ]
  }),
});

const paginations = combineReducers({
  links: paginationReducer({
    mapActionToKey: action => action.id,
    types: [
      ActionTypes.GET_LINKS_REQUEST,
      ActionTypes.GET_LINKS_SUCCESS,
      ActionTypes.GET_LINKS_FAILURE,
      ActionTypes.GET_LINKS_REFRESH
    ]
  }),
  commentsByLink: paginationReducer({
    mapActionToKey: action => action.link,
    types: [
      ActionTypes.LOAD_COMMENTS_REQUEST,
      ActionTypes.LOAD_COMMENTS_SUCCESS,
      ActionTypes.LOAD_COMMENTS_FAILURE
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
  }),
  user: entityReducer({
    types: [
      ActionTypes.LOAD_USER_REQUEST,
      ActionTypes.LOAD_USER_SUCCESS,
      ActionTypes.LOAD_USER_FAILURE,
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
  modals,
  form: formReducer
});
