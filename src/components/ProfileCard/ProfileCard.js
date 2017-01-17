import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Badge, Tooltip } from 'reactstrap';

import './ProfileCard.scss';

export default class ProfileCard extends Component {

  static propTypes = {
    id: PropTypes.number,
    username: PropTypes.string,
    avatar: PropTypes.string,
  }

  state = {
    tooltipOpen: false,
  }

  toggleTooltip(){
    this.setState({ tooltipOpen: !this.state.tooltipOpen});
  }

  render() {

    const {
      id,
      username,
      avatar,
      link_count,
      comment_count,
      karma
    } = this.props;

    return (
      <div className="profile-card">
        <img className="profile-card-pic" src={ avatar ? '/' + avatar : '' }>
        </img>
        <span className="profile-card-name">{ username } <Badge id="karma-tooltip">{ karma }</Badge>
        <Tooltip placement="top" isOpen={ this.state.tooltipOpen } target="karma-tooltip" toggle={this.toggleTooltip.bind(this)}>
          Karma
        </Tooltip>
        </span>
        <ul className="profile-card-info">
          <li>
            <Link to={`/u/${id}/${username.toLowerCase()}/links`}>
              <span className="profile-card-info-title">Links</span>
              <span className="profile-card-info-value">{ link_count }</span>
            </Link>
          </li>
          <li>
            <Link to={`/u/${id}/${username.toLowerCase()}/comments`}>
              <span className="profile-card-info-title">Comments</span>
              <span className="profile-card-info-value">{ comment_count }</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
