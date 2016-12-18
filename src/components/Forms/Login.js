import './forms.scss';

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Form, Input, FormGroup, Col, Label, Button, ButtonGroup, Alert} from 'reactstrap';

import Container from '../Container';

import { required, email, minLength } from './validate';
import renderField from './renderField';


class LoginForm extends Component {

  submitLogin(e){
    e.preventDefault();
    const username = findDOMNode(this.refs.username).value;
    const password = findDOMNode(this.refs.password).value;
    this.props.loginUser(username, password);
  }

  renderError(){
    if(!this.props.loginError){
      return null;
    }

    return (
      <Alert color="danger">
        <strong>Error</strong> { this.props.loginError }
      </Alert>
    );
  }

  render() {

    const { handleSubmit,
            pristine,
            reset,
            submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Field name="username" type="text" label="Username"
          component={renderField}
          validate={[ required ]}
        />
        <Field name="password" type="password" label="Password"
          component={renderField}
          validate={[ required ]}
        />
        <ButtonGroup>
          <Button type="submit" color="primary" disabled={submitting}>Login</Button>
        </ButtonGroup>
        { this.props.isAuthenticating ? 'Processing...' : ''}
        { this.renderError() }
      </Form>
    );
  }
}

export default reduxForm({
  form: 'loginForm',
  destroyOnUnmount: false
})(LoginForm);
