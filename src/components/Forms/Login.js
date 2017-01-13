import './forms.scss';

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Form, Input, FormGroup, Col, Label, Button, ButtonGroup, Alert} from 'reactstrap';

import Container from '../Container';
import Spinner from '../Spinner';

import { required, email, minLength } from './validate';
import renderField from './renderField';

class LoginForm extends Component {
  render() {

    const { handleSubmit,
            pristine,
            reset,
            submitting,
            error,
            submitFailed,
            submitSucceeded,
            hideSubmit
        } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Field
          icon="user"
          name="username"
          type="text"
          label="Username"
          component={renderField}
          validate={[ required ]}
        />
        <Field
          icon="lock"
          name="password"
          type="password"
          label="Password"
          component={renderField}
          validate={[ required ]}
        />

        {submitting && (
          <Spinner />
        )}

        {!submitting && submitFailed && error && (
          <Alert color="danger">
            <strong>Error</strong> { error }
          </Alert>
        )}

        {!submitting && submitSucceeded && (
          <Alert color="success">
            <strong>Login succeeded</strong>
          </Alert>
        )}

        {!hideSubmit && (
          <ButtonGroup>
            <Button type="submit" color="primary" disabled={submitting}>Login</Button>
          </ButtonGroup>
        )}

      </Form>
    );
  }
}

export default reduxForm({
  form: 'loginForm'
})(LoginForm);
