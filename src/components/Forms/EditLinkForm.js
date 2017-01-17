import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Form, Input, FormGroup, Col, Label, Button, ButtonGroup, Alert} from 'reactstrap';
import Spinner from '../Spinner';

import { required, email, minLength } from './validate';
import renderField from './renderField';

class EditLinkForm extends Component {
  render() {

    const { handleSubmit,
            pristine,
            reset,
            submitting,
            submitFailed,
            submitSucceeded,
            error,
            showCancel,
            onCancelClick,
            hideSubmit
      } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Field
          name="description"
          type="textarea"
          height="250px"
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
            <strong>Link Updated!</strong>
          </Alert>
        )}

        <ButtonGroup className={hideSubmit ? 'hidden' : ''}>
          <Button type="submit" color="primary" disabled={submitting}>Login</Button>
        </ButtonGroup>

      </Form>
    );
  }
}

export default reduxForm({
  form: 'editLinkForm'
})(EditLinkForm);
