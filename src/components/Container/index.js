import React, { Component } from 'react';

import './wrapper.scss';

class Container extends Component {
  render() {
    return (
      <div className={'container' +  (this.props.className ? ' ' + this.props.className : '')}>
      {this.props.children}
      </div>
    );
  }
}

export default Container;
