import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import CommentsContainer from '../Controlled/Comments';

import Container from '../../components/Container';
import SubHeader from '../../components/SubHeader';
import LinkItem from '../../components/Link';
import Spinner from '../../components/Spinner';
import Comment from '../../components/Comment';
import NestedList from '../../components/NestedList';
import createForm, {CommentForm} from '../../components/Forms';

const CommentFormObj = createForm(CommentForm, 'commentForm');

import {
  setPageInfo, submitForm, postNewLink,
  loadLinks, voteLink, loadLink, loadComments
} from '../../actions';

class LinkContainer extends Component {
  componentDidMount() {
    const {
      directory,
      link,
    } = this.props.params;

    this.loadContent({link, directory});
  }

  componentWillReceiveProps(nextProps){
    const {
      directory,
      link,
    } = nextProps.params;

    if(this.props.params.link !== link){
      this.loadContent({link, directory});
    }
  }

  loadContent({link, directory}){
    this.props.loadLink({ link });
    //this.props.loadComments({ link });
  }

  renderComment({ id, author, content }, children){
    const CommentReplyForm = this.props.forms[id];

    return (
        <Comment key={id}
          id={id}
          author={author}
          content={content}
        >
          <CommentReplyForm
            show={false}
          />
          {children}
        </Comment>
    );
  }

  render() {


    const {
      id,
      title,
      directory,
      url,
      image,
      votes,
      upvoted,
      downvoted
    } = this.props.link || {};

    const {
      link
    } = this.props.params;

    const {
      comments,
      isFetchingComments
    } = this.props;

    return (
      <div>
      <SubHeader
        title={ this.props.params.directory }
        compact={ true }
        directory={ this.props.params.directory }
      />

        {this.props.loadingLink && (<Spinner />) || (
          <LinkItem
            onUpvote={ () => this.props.voteLink({id, vote: 'upvote'}) }
            onDownvote={ () => this.props.voteLink({id, vote: 'downvote'}) }
            upvoteDisabled={ upvoted }
            downvoteDisabled={ downvoted }
            id={ id }
            directory={ directory }
            title={ title }
            url={ url }
            image={ image }
            voteCount={ votes }
            commentCount={ 300 }
          />
        )}

        <CommentFormObj/>

        <CommentsContainer id={id} />

      </div>
    );
  }
}

const FormList = {};

const mapStateToProps = (state, ownProps) => {

  const {
    link,
  } = ownProps.params;

  const {
    paginations: { commentsByLink },
    entities: { links, comments },
    entity
  } = state;

  const commentsPagination = commentsByLink[link] || { ids: [], isFetching: false };
  const commentList = commentsPagination.ids.map(id => comments[id]);


  const linkItem = links[link];

  return {
    loadingLink: entity.link.isFetching,
    isFetchingComments: commentsPagination.isFetching,
    link: linkItem,
    comments: commentList
  }
}


export default connect(mapStateToProps,
  {
    setPageInfo,
    submitForm,
    postNewLink,
    loadLinks,
    voteLink,
    loadLink,
    loadComments
  }
)(LinkContainer);
