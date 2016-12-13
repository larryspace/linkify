import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Form, Input, FormGroup, Col, Label,
  Button, ButtonGroup, Alert, FormFeedback} from 'reactstrap';

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined

class RegisterForm extends Component {

  submitForm(e){
    e.preventDefault();
  }

  renderError(){
    if(!this.props.error){
      return null;
    }

    return (
      <Alert color="danger">
        <strong>Error</strong> { this.props.error }
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

    if(this.props.isAuthenticating){
      return (<Container>Authenticating...</Container>);
    }

    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
        <Form onSubmit={handleSubmit}>
          <Field name="username" type="text" label="Username"
            component={this.renderField}
            validate={[ required ]}
          />
          <Field name="password" type="password" label="Password"
            component={this.renderField}
            validate={[ required ]}
          />
          <Field name="repeatPassword" type="password" label="Repeat Password"
            component={this.renderField}
            validate={[ required ]}
          />
          <Field name="email" type="text" label="Email"
            component={this.renderField}
            validate={[ required, email ]}
          />
          <ButtonGroup>
            <Button type="submit" color="primary" disabled={submitting}>Register</Button>
          </ButtonGroup>
          { this.renderError() }
        </Form>
    );
  }
}

export default reduxForm({
  form: 'registerForm'
})(RegisterForm);
