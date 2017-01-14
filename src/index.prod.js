import 'babel-polyfill';
import 'core-js/fn/object/assign';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import configureStore from './store';
import Root from './containers/Root';

const store = configureStore();

render(
  <Root store={ store } />,
  document.getElementById('root')
);
