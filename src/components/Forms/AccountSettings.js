import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Form, Input, FormGroup, Col, Label, Button, ButtonGroup, Alert} from 'reactstrap';

import { required, email, minLength } from './validate';
import renderField from './renderField';


class AccountSettings extends Component {
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
        <Field
          icon="user"
          name="username"
          type="text"
          label="Username"
          component={renderField}
          validate={[ required ]}
        />
        <Field
          icon="user"
          name="first_name"
          type="text"
          label="First Name"
          component={renderField}
          validate={[ required ]}
        />
        <Field
          icon="user"
          name="last_name"
          type="text"
          label="Last Name"
          component={renderField}
          validate={[ required ]}
        />
        <ButtonGroup>
          <Button type="submit" color="primary" disabled={submitting}>Save</Button>
        </ButtonGroup>
        { this.props.isAuthenticating ? 'Processing...' : ''}
        { this.renderError() }
      </Form>
    );
  }
}

export default reduxForm({
  form: 'accountSettings'
})(AccountSettings);
