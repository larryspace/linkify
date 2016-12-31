import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Form, Input, FormGroup, Col, Label, Button, ButtonGroup, Alert} from 'reactstrap';

import { required, email, minLength } from './validate';
import renderField from './renderField';

const validate = ({new_password, confirm_password}) => {
  const errors = {};

  if(new_password != confirm_password){
    errors.confirm_password = 'Doesnt match new password';
  }

  return errors;
}


class AccountSettings extends Component {
  render() {

    const { handleSubmit,
            pristine,
            reset,
            submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Field
          icon="lock"
          name="current_password"
          type="password"
          label="Current Password"
          component={renderField}
          validate={[ required ]}
        />
        <Field
          icon="lock"
          name="new_password"
          type="password"
          label="New Password"
          component={renderField}
          validate={[ required ]}
        />
        <Field
          icon="lock"
          name="confirm_password"
          type="password"
          label="Confirm Password"
          component={renderField}
          validate={[ required ]}
        />
        <ButtonGroup>
          <Button type="submit" color="primary" disabled={submitting}>Save</Button>
        </ButtonGroup>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'changePassword',
  validate
})(AccountSettings);
