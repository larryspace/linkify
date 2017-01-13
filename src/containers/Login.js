import React, { Component, PropTypes } from 'react';
import { Link, Redirect} from 'react-router';
import { connect } from 'react-redux';
import { loginUser, setPageInfo } from '../actions';

import Container from '../components/Container';
import LoginForm from '../components/Forms/Login';

class LoginContainer extends Component {

  componentWillMount() {

  }

  componentDidMount() {
    this.props.setPageInfo({ title: 'Login' });
  }

  redirectIfAuthenticated(nextProps) {
    if(this.props.isAuthenticated){
      return (<Redirect to="/home" />);
    }
  }

  render() {
    const login = (values) => this.props.loginUser(values);

    return (
      <Container>
        <LoginForm
            onSubmit = { login }
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
    isAuthenticated: state.Auth.isAuthenticated,
    error: state.Auth.error,
  }
}


export default connect(mapStateToProps,
  {
    loginUser,
    setPageInfo
  }
)(LoginContainer);
