import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Form, Input, FormGroup, Col, Label,
  Button, ButtonGroup, Alert, FormFeedback} from 'reactstrap';

import { required, email, minLength } from './validate';


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

  renderField({ input, label, name, type, meta: { touched, error, warning } }) {
    return (
    <FormGroup row color={touched && (error && 'danger' || warning && 'danger') || ''}>
      <Label for={name} sm={2}>{label}</Label>
      <Col sm={10}>
        <Input {...input} type={type} placeholder={label} />
        {touched && ((error && <FormFeedback>{error}</FormFeedback>) || (warning && <FormFeedback>{warning}</FormFeedback>))}
      </Col>
    </FormGroup>)
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
        <Form onSubmit={handleSubmit}>
          <Field name="username" type="text" label="Username"
            component={this.renderField}
            validate={[ required ]}
          />
          <Field name="password" type="password" label="Password"
            component={this.renderField}
            validate={[ required, minLength(6) ]}
          />
          <Field name="repeatPassword" type="password" label="Repeat Password"
            component={this.renderField}
            validate={[  ]}
          />
          <Field name="email" type="text" label="Email"
            component={this.renderField}
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
  validate
})(RegisterForm);
