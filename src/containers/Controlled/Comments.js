import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Container from '../../components/Container';
import Spinner from '../../components/Spinner';
import Comment from '../../components/Comment';
import NestedList from '../../components/NestedList';
import createForm, {CommentForm} from '../../components/Forms';

import {
  loadComments
} from '../../actions';

class CommentsContainer extends Component {

  state = {
    forms: {}
  }

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

  toggleReplyForm(id){
    const formState = this.state.forms[id] || {};

    this.setState({
      forms: {
        ...this.state.forms,
        [id]: {
          show: !formState.show,
        }
      }
    });
  }

  submitComment(values){
    console.log(values);
  }

  renderComment({ id, author, content }, children){
    const CommentReplyForm = this.props.forms[id];
    const formState = this.state.forms[id] || {};

    return (
        <Comment key={id}
          id={id}
          author={author}
          content={content}
          created_at={''}
          upvoted={false}
          downvoted={false}
          showEditCommentButton={false}
          onUpvoteClick={() => {}}
          onDownvoteClick={() => {}}
          onReplyClick={() => this.toggleReplyForm(id)}
          onQuoteClick={() => this.toggleReplyForm(id)}
        >
          {formState.show && (<CommentReplyForm
            onSubmit={this.submitComment}
          />)}
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

const FormList = {};

const mapStateToProps = (state, ownProps) => {

  const {
    paginations: { commentsByLink },
    entities: { comments }
  } = state;

  const linkId = ownProps.id;

  const commentsPagination = commentsByLink[linkId] || { ids: [], isFetching: false };
  const commentList = commentsPagination.ids.map(id => comments[id]);

  commentList.forEach(comment => {
    if(!FormList[comment.id]){
      console.log('Doesnt exist', ownProps);
      FormList[comment.id] = createForm(CommentForm, 'commentForm' + comment.id)
    }
  });

  return {
    isFetchingComments: commentsPagination.isFetching,
    comments: commentList,
    forms: FormList
  }
}


export default connect(mapStateToProps,
  {
    loadComments
  }
)(CommentsContainer);
