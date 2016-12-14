import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';

import FontAwesome from 'react-fontawesome';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import Container from '../components/Container';
import RegisterForm from '../components/Forms/Register';

import { registerUser } from '../actions';

class RegisterContainer extends Component {

  render() {
    const register = (values) => {
      this.props.registerUser(values);
    }

    return (
      <Container>
        <h2>Register</h2>
        <RegisterForm
            onSubmit = { register }
            registerError = { this.props.error }
            isRegistering = { this.props.isRegistering }
        />
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isRegistering: state.Register.isRegistering,
    error: state.Register.error,
  }
}


export default connect(mapStateToProps,
  {
    registerUser
  }
)(RegisterContainer);
