import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Badge } from 'reactstrap';

import './ProfileCard.scss';

export default class ProfileCard extends Component {

  static propTypes = {
    username: PropTypes.string,
    avatar: PropTypes.string,
  }

  render() {

    const {
      username,
      avatar
    } = this.props;

    return (
      <div className="profile-card">
        <img className="profile-card-pic" src={ avatar ? '/' + avatar : '' }>
        </img>
        <span className="profile-card-name">{ username } <Badge>0</Badge></span>
        <ul className="profile-card-info">
          <li>
            <Link to={'profile/links'}>
              <span className="profile-card-info-title">Links</span>
              <span className="profile-card-info-value">22</span>
            </Link>
          </li>
          <li>
            <Link to={'profile/comments'}>
              <span className="profile-card-info-title">Comments</span>
              <span className="profile-card-info-value">22</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
