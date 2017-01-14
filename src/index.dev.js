import 'babel-polyfill';
import 'core-js/fn/object/assign';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store';
import Root from './containers/Root';

const store = configureStore();

render(
  <AppContainer><Root store={ store } /></AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default;
    render(
      <AppContainer><NewRoot store={ store } /></AppContainer>,
      document.getElementById('root')
    );
  });
}
