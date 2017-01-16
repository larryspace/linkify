import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Container from '../../components/Container';
import SubHeader from '../../components/SubHeader';
import ModalForm from '../../components/ModalForm';
import NewLinkForm from '../../components/Forms/NewLinkForm';
import LinkItem from '../../components/Link';
import Spinner from '../../components/Spinner';
import NotFound from '../../components/NotFound';

import LinksContainer from '../Controlled/Links';

import { setPageInfo, submitForm, postNewLink, loadLinks, voteLink,
  loadDirectory, toggleLoginModal, subscribeDirectory
} from '../../actions';

class DirectoryContainer extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {
    formOpen: false,
  }

  loadContent(directory){
    this.props.setPageInfo({ title: '', directory: directory });
    this.props.loadDirectory({ directory });
  }

  componentDidMount() {
    const {
      directory = 'all'
    } = this.props.params;

    this.loadContent(directory);
  }

  componentWillReceiveProps(nextProps){
    const {
      directory
    } = nextProps.params;

    if(this.props.params.directory != directory || this.props.user.id !== nextProps.user.id){
      this.loadContent(directory || 'all');
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
      const newPath = `/s/${directory}/${action.response.result}/comments`;
      this.context.router.transitionTo(newPath);
    });
  }

  toggleModal(){
    if(!this.props.user.id){
      this.props.toggleLoginModal();
      return;
    }

    this.setState({ formOpen: !this.state.formOpen});
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
    const subscribed = this.props.subscribedDirectoriesIds.find(id => id === directory) !== undefined;

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
           onSubscribeClick={ () => this.props.subscribeDirectory({ directory: directoryItem.name.toLowerCase() }) }
           directory={ directoryItem.name.toLowerCase() }
           subscribed={ subscribed }
           sortOption={ this.props.params.sort || 'hot' }
         />
       )}

      { this.props.loadingDirectory && (<Spinner />)}
      <Container>
        {directoryItem && (
          <LinksContainer
            id={ directoryItem.id }
            type={ 'directory' }
            sort={ sort || 'hot' }
          />
        )}
      </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  const {
    directory = 'all',
  } = ownProps.params;

  const {
    collections: { subscribedDirectories },
    entities: { directories, users },
    entity
  } = state;

  const directoryItem = directories[directory];

  return {
    subscribedDirectoriesIds: subscribedDirectories.ids,
    user: users[state.Auth.user] || {},
    loadingDirectory: entity.directory.isFetching,
    directory: directoryItem,
    submitting: state.form.newLinkForm && state.form.newLinkForm.submitting
  }
}


export default connect(mapStateToProps,
  {
    setPageInfo,
    submitForm,
    postNewLink,
    voteLink,
    loadDirectory,
    toggleLoginModal,
    subscribeDirectory
  }
)(DirectoryContainer);
