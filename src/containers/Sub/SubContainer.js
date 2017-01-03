import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Container from '../../components/Container';
import SubHeader from '../../components/SubHeader';
import SubList from '../../components/SubList';
import ModalForm from '../../components/ModalForm';
import NewLinkForm from '../../components/Forms/NewLinkForm';

import { setPageInfo, submitForm, postNewLink, loadLinks } from '../../actions';

class SubContainer extends Component {

  state = {
    formOpen: false,
  }

  componentDidMount() {
    const directory = this.props.params.directory;
    this.props.setPageInfo({ title: '', directory: directory });
    this.props.loadLinks({ directory });
  }

  componentWillReceiveProps(nextProps){
    const newDirectory = nextProps.params.directory;
    if(this.props.params.directory != newDirectory){
      this.props.setPageInfo({ title: '', directory: newDirectory });
      this.props.loadLinks({ directory: newDirectory });
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
      if(!action.error){
        this.toggle();
      }
    });
  }

  toggleModal(){
    this.setState({ formOpen: !this.state.formOpen});
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
        title={ "Title" }
        onNewLinkClick={this.toggleModal.bind(this)}
      />
      <Container>
        <SubList />
      </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    directory: state.Page.directory,
    submitting: state.form.newLinkForm && state.form.newLinkForm.submitting
  }
}


export default connect(mapStateToProps,
  {
    setPageInfo,
    submitForm,
    postNewLink,
    loadLinks
  }
)(SubContainer);
