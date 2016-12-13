import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';


import { loginUser } from '../actions';

import FontAwesome from 'react-fontawesome';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


import LoginForm from '../components/Forms/Login';

class LoginContainer extends Component {

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  loginUser(username, password){
    this.props.loginUser(username, password);
  }

  render() {
    const loginUserFunction = (username, password) => this.loginUser(username, password);

    return (
      <LoginForm
          loginUser = {loginUserFunction}
          error = { this.props.error }
          isAuthenticating = { this.props.isAuthenticating }
      />
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
