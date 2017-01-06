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

import { setPageInfo, submitForm, postNewLink, loadLinks, voteLink } from '../../actions';

class SubContainer extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {
    formOpen: false,
  }

  componentDidMount() {
    const directory = this.props.params.directory;
    this.props.setPageInfo({ title: '', directory: directory });
    this.props.loadLinks({
      directory,
      sortBy: this.props.params.sort || 'hot'
    });
  }

  componentWillReceiveProps(nextProps){
    const {
      directory,
      sort = 'hot'
    } = nextProps.params;


    if(this.props.params.directory != directory || (this.props.params.sort || 'hot') !== sort){
      this.props.setPageInfo({ title: '', directory });
      this.props.loadLinks({
        directory,
        sortBy: sort
      });
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
        }, false, true);
      }else{
        this.context.router.transitionTo(newPath);
      }
    });
  }

  toggleModal(){
    this.setState({ formOpen: !this.state.formOpen});
  }

  vote(id, vote){
    this.props.voteLink({id, vote});
  }

  loadMore(){
    this.props.loadLinks({
      directory: this.props.params.directory,
      sortBy: this.props.params.sort || 'hot'
    }, true);
  }

  renderLink({ id, directory, title, url, score, votes, image, upvoted, downvoted }){
    return (
      <LinkItem key={ 'link_' + id }
        onUpvote={ () => this.vote(id, 'upvote') }
        onDownvote={ () => this.vote(id, 'downvote') }
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
    );
  }

  render() {

    return (
      <div>
      <ModalForm
        isOpen={ this.state.formOpen }
        toggle={ this.toggleModal.bind(this) }
        disabled={ this.props.submitting }
        form={ NewLinkForm }
        onSubmit={ this.onSubmitNewLink.bind(this) }
        onSubmitClick={() => this.props.submitForm('newLinkForm')}
       />
      <SubHeader
        title={ this.props.params.directory }
        onNewLinkClick={ this.toggleModal.bind(this) }
        directory={ this.props.params.directory }
        sortOption={ this.props.params.sort || 'hot' }
      />
      <Container>
         <SubList
           items={ this.props.links }
           renderItem={this.renderLink.bind(this)}
         />
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

  const links = state.Links.links[directory] && state.Links.links[directory][sort] && state.Links.links[directory][sort].items || [];

  return {
    loading: state.Links.loading,
    links,
    directory: state.Page.directory,
    submitting: state.form.newLinkForm && state.form.newLinkForm.submitting
  }
}


export default connect(mapStateToProps,
  {
    setPageInfo,
    submitForm,
    postNewLink,
    loadLinks,
    voteLink
  }
)(SubContainer);
