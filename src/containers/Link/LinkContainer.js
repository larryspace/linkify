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
import NotFound from '../../components/NotFound';
import createForm, {CommentForm} from '../../components/Forms';

const CommentFormObj = createForm(CommentForm, 'commentForm');

import {
  setPageInfo, submitForm, postNewLink,
  loadLinks, voteLink, loadLink, loadComments, newComment
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

  render() {

    if(!this.props.loadingLink && !this.props.link){
      return (
        <Container>
          <NotFound />
        </Container>
      );
    }


    const {
      id,
      title,
      directory,
      url,
      image,
      votes,
      upvoted,
      downvoted,
      comment_count
    } = this.props.link || {};

    const {
      link
    } = this.props.params;

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
            commentCount={ comment_count }
          />
        )}

        {this.props.link && (
          <CommentFormObj
            onSubmit={values => this.props.newComment({link, parent: 0, ...values})}
          />
        )}

        {this.props.link && (
          <CommentsContainer id={id} />
        )}


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
    entities: { links },
    entity
  } = state;

  const linkItem = links[link];

  return {
    loadingLink: entity.link.isFetching,
    link: linkItem,
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
    loadComments,
    newComment
  }
)(LinkContainer);
