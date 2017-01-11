import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Media } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import createForm, {CommentForm} from '../../components/Forms';

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
    showEditButton: PropTypes.bool.isRequired,
    onEditSubmit: PropTypes.func.isRequired,
    onReplySubmit: PropTypes.func.isRequired,
    showDeleteButton: PropTypes.bool.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
  }

  state = {
    isReplyMode: false,
    isEditMode: false,
    editForm: createForm(CommentForm, 'commentEditForm' + this.props.id),
    replyForm: createForm(CommentForm, 'commentReplyForm' + this.props.id)
  }

  toggleEditMode(){
    this.setState({
      isReplyMode: false,
      isEditMode: !this.state.isEditMode,
    });
  }

  toggleReplyMode(){
    this.setState({
      isReplyMode: !this.state.isReplyMode,
      isEditMode: false,
    });
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
      showEditButton,
      onReplySubmit,
      onEditSubmit,
      showDeleteButton,
      onDeleteClick,
      avatar
    } = this.props;

    return (
      <Media className="comment">
        <Media left top href="#" className="comment-image">
          <Media object src={avatar} alt="Profile Picture" />
        </Media>
        <Media body className="comment-body">
          <Media heading className="comment-heading">
            <button onClick={onUpvoteClick} className={upvoted ? 'voted' : ''}><FontAwesome name="arrow-up" /></button>
            4
            <button onClick={onDownvoteClick} className={downvoted ? 'voted' : ''}><FontAwesome name="arrow-down" /></button>
            <Link to={'/u/' + author.toLowerCase()}>{ author  }</Link>
            <button onClick={this.toggleReplyMode.bind(this)}>Reply</button>
            {showEditButton && (<button onClick={this.toggleEditMode.bind(this)}>Edit</button>)}
            {showDeleteButton && (<button onClick={ onDeleteClick }>Delete</button>)}
          </Media>
          <div className="comment-content">
            { !this.state.isEditMode && content }
          </div>
          {this.state.isEditMode && (
            <this.state.editForm
              onSubmit={ values => onEditSubmit(values).then(response => this.toggleEditMode())}
              initialValues={{ content }}
              showCancel={ true }
              onCancelClick={ this.toggleEditMode.bind(this) }
          />)}
          {this.state.isReplyMode && (
            <this.state.replyForm
              onSubmit={ values => onReplySubmit(values).then(response => this.toggleReplyMode()) }
              showCancel={ true }
              onCancelClick={ this.toggleReplyMode.bind(this) }
          />)}
          { this.props.children }
        </Media>
      </Media>
    );
  }
}
