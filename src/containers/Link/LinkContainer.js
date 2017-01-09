import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Container from '../../components/Container';
import SubHeader from '../../components/SubHeader';
import SubList from '../../components/SubList';
import ModalForm from '../../components/ModalForm';
import NewLinkForm from '../../components/Forms/NewLinkForm';
import LinkItem from '../../components/Link';
import Spinner from '../../components/Spinner';

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
    this.props.loadComments({ link });
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
      </div>
    );
  }
}

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
    loadComments
  }
)(LinkContainer);
