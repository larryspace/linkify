import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Container from '../../components/Container';
import Spinner from '../../components/Spinner';
import Comment from '../../components/Comment';
import NestedList from '../../components/NestedList';
import createForm, {CommentForm} from '../../components/Forms';

import {
  loadComments,
  newComment,
  editComment
} from '../../actions';

class CommentsContainer extends Component {
  componentDidMount() {
    const {
      id
    } = this.props;

    this.props.loadComments({ link: id });
  }

  componentWillReceiveProps(nextProps){
    const {
      id,
    } = nextProps;

    if(this.props.id !== id){
      this.props.loadComments({ link: id });
    }
  }

  renderComment({ id, author, content }, children){
    return (
        <Comment key={id}
          id={id}
          author={author}
          content={content}
          created_at={''}
          upvoted={false}
          downvoted={false}
          showEditButton={true}
          onReplySubmit={values => this.props.newComment({link: this.props.id, parent: id, ...values})}
          onEditSubmit={values => this.props.editComment({id, ...values})}
          onUpvoteClick={() => {}}
          onDownvoteClick={() => {}}
        >
          {children}
        </Comment>
    );
  }

  render() {
    const {
      comments,
      isFetchingComments
    } = this.props;

    return (
      <NestedList
          renderItem={this.renderComment.bind(this)}
          component={Comment}
          items={comments}
          isFetching={isFetchingComments}
          onLoadMoreClick={()=>alert(1)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  const {
    paginations: { commentsByLink },
    entities: { comments }
  } = state;

  const linkId = ownProps.id;

  const commentsPagination = commentsByLink[linkId] || { ids: [], isFetching: false };
  const commentList = commentsPagination.ids.map(id => comments[id]);

  return {
    isFetchingComments: commentsPagination.isFetching,
    comments: commentList
  }
}


export default connect(mapStateToProps,
  {
    loadComments,
    newComment,
    editComment
  }
)(CommentsContainer);
