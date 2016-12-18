import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router';
import { Form, Input, FormGroup, Col, Label,
  Button, ButtonGroup, Alert, FormFeedback} from 'reactstrap';

import { required, email, minLength } from './validate';

import renderField from './renderField';


const validate = ({password, repeatPassword}) => {
  const errors = {};

  if(password != repeatPassword){
    errors.repeatPassword = 'Must equal password';
  }

  return errors;
}

class RegisterForm extends Component {
  renderError(){
    if(!this.props.registerError){
      return null;
    }

    return (
      <Alert color="danger">
        <strong>Error</strong> { this.props.registerError }
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
            validate={[ required, minLength(6) ]}
          />
          <Field name="repeatPassword" type="password" label="Repeat Password"
            component={renderField}
            validate={[  ]}
          />
          <Field name="email" type="text" label="Email"
            component={renderField}
            validate={[ required, email ]}
          />
          <ButtonGroup>
            <Button type="submit" color="primary" disabled={submitting}>Register</Button>
          </ButtonGroup>
          { this.props.isRegistering ? 'Processing...' : ''}
          { this.renderError() }
        </Form>
    );
  }
}

export default reduxForm({
  form: 'registerForm',
  destroyOnUnmount: false,
  validate
})(RegisterForm);
