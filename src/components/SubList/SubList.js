import React, { Component } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

import './SubList.scss';

export default class SubList extends Component {
  render() {
    return (
      <div>
      <ul className="sub-list">
        {this.props.items.map(this.props.renderItem)}
      </ul>
      </div>
    );
  }
}
