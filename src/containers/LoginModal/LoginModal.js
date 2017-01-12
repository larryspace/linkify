import React, { Component, PropTypes } from 'react';
import { Link, Redirect} from 'react-router';
import { connect } from 'react-redux';
import { loginUser, setPageInfo, submitForm, toggleLoginModal } from '../../actions';

import ModalForm from '../../components/ModalForm';
import LoginForm from '../../components/Forms/Login';

class LoginModal extends Component {
  componentWillMount() {

  }

  componentDidMount() {
    this.props.setPageInfo({ title: 'Login' });
  }

  toggleModal(){
    this.props.toggleLoginModal();
  }

  onSubmitLogin(values){
    return this.props.loginUser(values)
    .then(action => {
      this.toggleModal();
    });
  }

  render() {
    return (
      <ModalForm
        isOpen={ this.props.modal.show }
        toggle={ this.toggleModal.bind(this) }
        disabled={ this.props.submitting || false }
        form={ LoginForm }
        onSubmit={ this.onSubmitLogin.bind(this) }
        title={ 'Login' }
        onSubmitClick={() => this.props.submitForm('loginForm')}
       />
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  const {
    modals: { login }
  } = state;

  return {
    modal: login,
    isAuthenticating: state.Auth.isAuthenticating,
    isAuthenticated: state.Auth.isAuthenticated,
    submitting: state.form.loginForm && state.form.loginForm.submitting
  }
}


export default connect(mapStateToProps,
  {
    loginUser,
    setPageInfo,
    submitForm,
    toggleLoginModal
  }
)(LoginModal);
