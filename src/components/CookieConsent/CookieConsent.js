import React, { Component, PropTypes } from 'react';

import './CookieConsent.scss';

export default class CookieConsent extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }

  render() {
    const {
      show,
      onClose
    } = this.props;

    return (
      <div className={'cookie-consent'  + (show ? '' : ' removed')}>
        <span className="info">
          This website uses cookies to ensure you get the best experience on our website.
        </span>
        <button onClick={ onClose }>Accept</button>
      </div>
    );
  }
}
