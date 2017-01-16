import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import CommentsContainer from '../Controlled/Comments';

import Container from '../../components/Container';
import SubHeader from '../../components/SubHeader';
import LinkItem from '../../components/Link';
import LinkPost from '../../components/LinkPost';
import Spinner from '../../components/Spinner';
import Comment from '../../components/Comment';
import NestedList from '../../components/NestedList';
import NotFound from '../../components/NotFound';
import createForm, {CommentForm} from '../../components/Forms';

const CommentFormObj = createForm(CommentForm, 'commentForm');

import {
  setPageInfo, submitForm, postNewLink, editLink, deleteLink,
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

    if(this.props.user.id !== nextProps.user.id){
      this.props.loadLink({ link }, true);
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
      user_id
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

      <Container>
        {this.props.loadingLink && (<Spinner />) || (
          <LinkPost
            onUpvote={ () => this.props.voteLink({id, vote: 'upvote'}) }
            onDownvote={ () => this.props.voteLink({id, vote: 'downvote'}) }
            owner={ user_id === this.props.user.id }
            onEditSubmit={ values => this.props.editLink({id, ...values}) }
            onDelete={() => this.props.deleteLink({ id })}
            link={ this.props.link || {} }
            author={ this.props.author || {} }
          />
        )}

        {this.props.user.id && this.props.link && (
          <CommentFormObj
            onSubmit={values => this.props.newComment({link, parent: 0, ...values})}
          />
        )}

        {this.props.link && (
          <CommentsContainer id={id} />
        )}
        </Container>
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
    entities: { links, users },
    entity
  } = state;

  const linkItem = links[link];

  return {
    user: users[state.Auth.user] || {},
    loadingLink: entity.link.isFetching,
    link: linkItem,
    author: users[(linkItem || {}).author] || {}
  }
}


export default connect(mapStateToProps,
  {
    setPageInfo,
    submitForm,
    postNewLink,
    loadLinks,
    voteLink,
    editLink,
    deleteLink,
    loadLink,
    loadComments,
    newComment
  }
)(LinkContainer);
