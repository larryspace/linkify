import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { Root } from './index';

const render = () => {
  const NextRootLayout = require('./index');
  ReactDOM.render(<AppContainer><Root /></AppContainer>, document.getElementById('app'));
}

render();

module.hot.accept('./index', render);
