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
import NotFound from '../../components/NotFound';

import { setPageInfo, submitForm, postNewLink, loadLinks, voteLink,
  loadDirectory, toggleLoginModal
} from '../../actions';

class SubContainer extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {
    formOpen: false,
  }

  loadContent(directory, sort='hot'){
    this.props.setPageInfo({ title: '', directory: directory });
    this.props.loadDirectory({ directory })
    .then( response => {
      if(response && response.error){
        return;
      }

      this.props.loadLinks({
        directory,
        sortBy: sort
      }, true);
    });

  }

  componentDidMount() {
    const {
      directory,
      sort = 'hot'
    } = this.props.params;

    this.loadContent(directory, sort);
  }

  componentWillReceiveProps(nextProps){
    const {
      directory,
      sort = 'hot'
    } = nextProps.params;

    if(this.props.params.directory != directory || (this.props.params.sort || 'hot') !== sort
    || this.props.user.id !== nextProps.user.id
      ){
      this.loadContent(directory, sort);
    }
  }

  onSubmitNewLink(values){
    const directory = this.props.params.directory;
    const data = {
      ...values,
      directory
    };

    return this.props.postNewLink(data)
    .then(action => {
      this.toggleModal();

      const newPath = `/s/${directory}/latest`;

      if(this.props.pathname === newPath){
        this.props.loadLinks({
          directory: this.props.params.directory,
          sortBy: this.props.params.sort || 'hot'
        }, true);
      }else{
        this.context.router.transitionTo(newPath);
      }
    });
  }

  toggleModal(){
    if(!this.props.user.id){
      this.props.toggleLoginModal();
      return;
    }

    this.setState({ formOpen: !this.state.formOpen});
  }

  loadMore(){
    this.props.loadLinks({
      directory: this.props.params.directory,
      sortBy: this.props.params.sort || 'hot'
    });
  }

  renderLink({ id, directory, title, url, score, comment_count, votes, image, upvoted, downvoted, username }){
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
        image={ image }
        voteCount={ votes }
        commentCount={ comment_count }
        username={ username }
      />
    );
  }

  render() {

    const {
      directory,
      sort,
      link
    } = this.props.params;

    if(!this.props.loadingDirectory && !this.props.directory){
      return (
        <Container>
          <NotFound />
        </Container>
      );
    }

    const directoryItem = this.props.directory;

    return (
      <div>
      <ModalForm
        isOpen={ this.state.formOpen }
        toggle={ this.toggleModal.bind(this) }
        title={ 'New Link' }
        disabled={ this.props.submitting || false }
        form={ NewLinkForm }
        onSubmit={ this.onSubmitNewLink.bind(this) }
        onSubmitClick={() => this.props.submitForm('newLinkForm')}
       />

       {directoryItem && (
         <SubHeader
           title={ directoryItem.name }
           onNewLinkClick={ this.toggleModal.bind(this) }
           directory={ directoryItem.name.toLowerCase() }
           sortOption={ this.props.params.sort || 'hot' }
         />
       )}

      { this.props.loadingDirectory && (<div><Spinner />Loading directory...</div>)}
      <Container>
        { link && (<div></div>) ||
        (
          <SubList
            items={ this.props.links }
            renderItem={this.renderLink.bind(this)}
          />
        )}

         {this.props.loading && (<Spinner />) }

       <button onClick={ this.loadMore.bind(this) }>Load More...</button>
      </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  const {
    directory,
    sort = 'hot'
  } = ownProps.params;

  const {
    paginations: { linksByDirectory },
    entities: { links, directories, users },
    entity
  } = state;

  const linksPagination = linksByDirectory[directory] || { ids: [] };
  const linkList = linksPagination.ids.map(id => links[id]);

  const directoryItem = directories[directory];

  return {
    user: users[state.Auth.user] || {},
    loadingDirectory: entity.directory.isFetching,
    loading: linksPagination.isFetching,
    links: linkList,
    directory: directoryItem,
    submitting: state.form.newLinkForm && state.form.newLinkForm.submitting
  }
}


export default connect(mapStateToProps,
  {
    setPageInfo,
    submitForm,
    postNewLink,
    loadLinks,
    voteLink,
    loadDirectory,
    toggleLoginModal
  }
)(SubContainer);
