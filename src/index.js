import 'babel-polyfill';
import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM, { render } from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import api from './middleware/api';

import App from './containers/App';

import Home from './components/Home/home';
import About from './components/About/about';
import NotFound from './components/notFound';

import LoginContainer from './containers/LoginContainer';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const store = createStore(
  reducers,
  applyMiddleware(thunk, api)
)

const routes = (
<Route path='/' component={ App }>
  <IndexRoute component={ Home } />
  <Route path='about' component={ About } />
  <Route path='login' component={ LoginContainer } />
  <Route path='*' component={ NotFound } />
</Route>
);

export const Root = () => (
  <Provider store={store}>
    <Router history={ browserHistory }>
      { routes }
    </Router>
  </Provider>
)

if (!module.hot) render(<Root />, document.getElementById('app'));
