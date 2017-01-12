import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Form, Input, FormGroup, Col, Label, Button, ButtonGroup, Alert} from 'reactstrap';
import Spinner from '../Spinner';

import { required, email, minLength, fileType } from './validate';
import renderField from './renderField';

class AvatarSettings extends Component {

  state = {
    avatarSrc: null,
  }


  onChangeFile(event){
    const files = event.target.files;
    const file = files[0];
    const reader = new FileReader();

    if (!file || !file.type.match('image.*')) {
      return;
    }

    reader.onload = (e) => {
      this.setState({avatarSrc: e.target.result})
    }
    reader.readAsDataURL(file);
  }

  render() {
    const { handleSubmit,
            pristine,
            reset,
            submitting,
            submitFailed,
            submitSucceeded,
            error
      } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <img className="avatar-image" src={this.state.avatarSrc || this.props.avatar} />
        <Field
          name="avatar"
          type="file"
          label="Avatar (Max 5MB)"
          onChange={this.onChangeFile.bind(this)}
          component={renderField}
          validate={[ required, fileType('image') ]}
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
            <strong>Avatar Updated!</strong>
          </Alert>
        )}

        <ButtonGroup>
          <Button type="submit" color="primary" disabled={submitting}>Save</Button>
        </ButtonGroup>

      </Form>
    );
  }
}

export default reduxForm({
  form: 'avatarSettings'
})(AvatarSettings);
