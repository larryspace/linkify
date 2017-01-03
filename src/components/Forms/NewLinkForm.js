import './forms.scss';

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Input, FormGroup, Col, Label, Button, ButtonGroup, Alert} from 'reactstrap';

import { required, email, minLength, url } from './validate';
import renderField from './renderField';

class NewLinkForm extends Component {
  render() {

    const { handleSubmit,
            pristine,
            reset,
            submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Field
          icon="info"
          name="title"
          type="text"
          label="Title"
          component={renderField}
          validate={[ required, minLength(3) ]}
        />
        <Field
          icon="link"
          name="link"
          type="text"
          label="Link"
          component={renderField}
          validate={[ required, url ]}
        />
      </Form>
    );
  }
}

export default reduxForm({
  form: 'newLinkForm'
})(NewLinkForm);
