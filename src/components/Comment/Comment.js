import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Media } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import './Comment.scss';

export default class Comment extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    upvoted: PropTypes.bool.isRequired,
    downvoted: PropTypes.bool.isRequired,
    onUpvoteClick: PropTypes.func.isRequired,
    onDownvoteClick: PropTypes.func.isRequired,
    showEditCommentButton: PropTypes.bool.isRequired,
    onReplyClick: PropTypes.func.isRequired,
    onQuoteClick: PropTypes.func.isRequired
  }

  render() {

    const {
      id,
      content,
      created_at,
      author,
      upvoted,
      downvoted,
      onUpvoteClick,
      onDownvoteClick,
      onQuoteClick,
      onReplyClick,
    } = this.props;

    return (
      <Media className="comment">
        <Media left top href="#" className="comment-image">
          <Media object data-src="holder.js/64x64" alt="Profile Picture" />
        </Media>
        <Media body className="comment-body">
          <Media heading className="comment-heading">
            <button onClick={onUpvoteClick} className={upvoted ? 'voted' : ''}><FontAwesome name="arrow-up" /></button>
            4
            <button onClick={onDownvoteClick} className={downvoted ? 'voted' : ''}><FontAwesome name="arrow-down" /></button>
            <Link to={'/u/' + author.toLowerCase()}>{ author  }</Link>
            <button onClick={onReplyClick}>Reply</button>
            <button onClick={onQuoteClick}>Quote</button>
          </Media>
          <div className="comment-content">
            { content }
          </div>
          { this.props.children }
        </Media>
      </Media>
    );
  }
}
