import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { getLocation, cutString } from 'linkify/utils';

import './Link.scss';

export default class LinkItem extends Component {

  static propTypes = {
    id: PropTypes.number,
    onUpvote: PropTypes.func,
    onDownvote: PropTypes.func,
    onUnvote: PropTypes.func,
    upvoted: PropTypes.bool,
    downvoted: PropTypes.bool,
    voteCount: PropTypes.number,
    url: PropTypes.string,
    title: PropTypes.string,
    date_created: PropTypes.string,
    commentCount: PropTypes.number,
    directory: PropTypes.string,
    user_id: PropTypes.number
  }

  render() {

    const {
      id,
      onUpvote,
      onDownvote,
      onUnvote,
      upvoted,
      downvoted,
      voteCount,
      url,
      title,
      description,
      date_created,
      user_id,
      commentCount,
      directory,
      image,
      username
    } = this.props;

    return (
      <div className="sub-list-item">
        <div className="sub-list-vote">
          <button className={upvoted ? 'voted' : ''} onClick={ !upvoted ? onUpvote : onUnvote }><FontAwesome name="arrow-up"/></button>
          <span className="upvote-count">{ voteCount }</span>
          <button className={downvoted ? 'voted' : ''} onClick={ !downvoted ? onDownvote : onUnvote }><FontAwesome name="arrow-down" /></button>
        </div>
        <a className="sub-list-item-link" href={ url } target="_blank">
          {image && (<img className="sub-list-image hidden-xs-down" src={image}></img>)}
          <div className="link-title">{ title }</div>
          <div className="link-desc hidden-xs-down">{ cutString(description, 40) }</div>
          <div className="link-date"><b>{ getLocation(url).hostname }</b> { date_created }</div>
        </a>
        <div className="sub-list-item-meta">
          <Link to={`/u/${user_id}/${username}`} className="sub-list-item-author">
            { username }
          </Link>
          <Link to={`/s/${directory}/${id}/comments`} className="sub-list-item-comments">
            <span className="comments-count">{ commentCount }</span>
            <span className="comments-button">Comments</span>
          </Link>
        </div>

      </div>
    );
  }
}
