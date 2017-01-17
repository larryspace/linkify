import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

import './Link.scss';

export default class LinkItem extends Component {

  static propTypes = {
    id: PropTypes.number,
    upVote: PropTypes.func,
    downVote: PropTypes.func,
    upvoteDisabled: PropTypes.bool,
    downvoteDisabled: PropTypes.bool,
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
      upvoteDisabled,
      downvoteDisabled,
      voteCount,
      url,
      title,
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
          <button disabled={ upvoteDisabled } onClick={ onUpvote }><FontAwesome name="arrow-up"/></button>
          <span className="upvote-count">{ voteCount }</span>
          <button disabled={ downvoteDisabled } onClick={ onDownvote }><FontAwesome name="arrow-down" /></button>
        </div>
        <a className="sub-list-item-link" href={ url } target="_blank">
          {image && (<div className="sub-list-image"></div>)}
          <div className="link-title">{ title }</div>
          <div className="link-desc">{ url }</div>
          <div className="link-date">{ date_created }</div>
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
