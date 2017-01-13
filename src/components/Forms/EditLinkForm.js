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
          icon="user"
          name="description"
          type="textarea"
          label=""
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

        {!hideSubmit && (
          <ButtonGroup>
            <Button type="submit" color="primary" disabled={submitting}>Save</Button>
            {showCancel && (<Button type="button" color="warning" onClick={onCancelClick}>Cancel</Button>)}
          </ButtonGroup>
        )}

      </Form>
    );
  }
}

export default reduxForm({
  form: 'editLinkForm'
})(EditLinkForm);
