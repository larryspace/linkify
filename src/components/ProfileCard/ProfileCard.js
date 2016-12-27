import React, { Component } from 'react';

import './ProfileCard.scss';

export default class ProfileCard extends Component {
  render() {
    return (
      <div className="profile-card">
        <div className="profile-card-pic">
        </div>
        <span className="profile-card-name">{ this.props.username } <span className="tag tag-default">321</span></span>
        <ul className="profile-card-info">
          <li>
            <a href="">
              <span className="profile-card-info-title">Links</span>
              <span className="profile-card-info-value">22</span>
            </a>
          </li>
          <li>
            <a href="">
              <span className="profile-card-info-title">Comments</span>
              <span className="profile-card-info-value">22</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
