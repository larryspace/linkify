import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Container from '../../components/Container';
import List from '../../components/List';
import LinkItem from '../../components/Link';
import Spinner from '../../components/Spinner';
import NotFound from '../../components/NotFound';

import {
  setPageInfo, loadLinks, voteLink, toggleLoginModal
} from '../../actions';

class LinksContainer extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string,
    sort: PropTypes.string
  }

  loadContent({ id, type, sort }, refresh){
    this.props.loadLinks({ id, type, sort }, refresh);
  }

  componentDidMount() {
    const {
      id,
      type,
      sort
    } = this.props;

    this.loadContent({id, type, sort}, true);
  }

  componentWillReceiveProps(nextProps){
    const {
      id,
      type,
      sort
    } = nextProps;

    if(this.props.id != id || this.props.type != type || this.props.sort != sort
    || this.props.user.id !== nextProps.user.id
      ){
      this.loadContent({ id, type, sort }, true);
    }
  }


  loadMore(){
    const {
      id,
      type,
      sort
    } = this.props;

    this.loadContent({id, type, sort});
  }

  renderLink({ id, directory, title, url, score, created_at, comment_count, votes, image, upvoted, downvoted, user_id, username }){
    return (
      <LinkItem key={ 'link_' + id }
        onUpvote={ () => this.props.voteLink({id, vote: 'upvote'}) }
        onDownvote={ () => this.props.voteLink({id, vote: 'downvote'}) }
        upvoteDisabled={ upvoted }
        downvoteDisabled={ downvoted }
        id={ id }
        directory={ directory }
        title={ title }
        url={ url }
        date_created={ created_at }
        image={ image }
        voteCount={ votes }
        commentCount={ comment_count }
        username={ username }
        user_id={ user_id }
      />
    );
  }

  render() {
    return (
      <List
        items={ this.props.links }
        renderItem={this.renderLink.bind(this)}
        isFetching={ this.props.isFetchingLinks }
        canFetchMore={ this.props.canFetchMoreLinks || false }
        onLoadMore={this.loadMore.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  const {
    id,
    type,
    sort
  } = ownProps;

  const {
    paginations,
    entities: { links, directories, users },
    entity
  } = state;

  const linksPagination = paginations.links[type+id] || { ids: [] };
  const linkList = linksPagination.ids.map(id => links[id]);

  return {
    user: users[state.Auth.user] || {},
    canFetchMoreLinks: linksPagination.canFetchMore,
    isFetchingLinks: linksPagination.isFetching || false,
    links: linkList,
  }
}


export default connect(mapStateToProps,
  {
    setPageInfo,
    loadLinks,
    voteLink,
    toggleLoginModal
  }
)(LinksContainer);
