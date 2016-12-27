import React, { Component, PropTypes } from 'react';

import FontAwesome from 'react-fontawesome';

export default ({ component: Component, ...rest }) => (
  <FontAwesome
        name='circle-o-notch'
        size='2x'
        spin
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />
)
