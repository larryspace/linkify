import React, { Component, PropTypes } from 'react';
import { Media } from 'reactstrap';


export default class Comment extends Component {

  render() {

    const {
      id,
      content,
      created_at,
      author
    } = this.props;

    return (
      <div>
      <Media>
        <Media left top href="#">
          <Media object data-src="holder.js/64x64" alt="Profile Picture" />
        </Media>
        <Media body>
          <Media heading>
            { author }
          </Media>
          { content }
          {this.props.children}
        </Media>
      </Media>
      </div>
    );
  }
}
