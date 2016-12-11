import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import {loginUser} from '../actions';

import FontAwesome from 'react-fontawesome';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


import LoginForm from '../components/loginForm';

class LoginContainer extends Component {
  componentWillMount() {

  }
  render() {
    return (
      <LoginForm />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticating: state.isAuthenticating,
});


export default connect(mapStateToProps,
  {
    loginUser
  }
)(LoginContainer)
