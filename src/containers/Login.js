import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';


import { loginUser } from '../actions';

import FontAwesome from 'react-fontawesome';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


import Container from '../components/Container';
import LoginForm from '../components/Forms/Login';

class LoginContainer extends Component {

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    const register = (values) => this.props.loginUser(values);

    return (
      <Container>
        <h2>Login</h2>
        <LoginForm
            onSubmit = { register }
            loginError = { this.props.error }
            isAuthenticating = { this.props.isAuthenticating }
        />
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticating: state.Auth.isAuthenticating,
    error: state.Auth.error,
  }
}


export default connect(mapStateToProps,
  {
    loginUser
  }
)(LoginContainer);
