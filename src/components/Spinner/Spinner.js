import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

import './Spinner.scss';

export default ({ component: Component, ...rest }) => (
  <div className="spinner-wrapper">
  <FontAwesome
        name='circle-o-notch'
        size='2x'
        spin
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
    </div>
)
