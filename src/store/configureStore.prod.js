import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

import api from '../middleware/api';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, api)
  )

  return store;
}
