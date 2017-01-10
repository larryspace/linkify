import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Form, Input, FormGroup, Col, Label, Button, ButtonGroup, Alert} from 'reactstrap';

import { required, email, minLength } from './validate';
import renderField from './renderField';

import './CommentForm.scss';

export default class CommentForm extends Component {
  render() {

    const { handleSubmit,
            pristine,
            reset,
            submitting,
            showCancel,
            onCancelClick
          } = this.props;

    return (
      <Form onSubmit={handleSubmit} className="comment-form">
        <Field
          icon="pencil-square-o"
          name="content"
          type="textarea"
          label="Comment"
          component={ renderField }
          validate={[ required ]}
        />
        <ButtonGroup>
          <Button type="submit" color="primary" disabled={submitting}>Save</Button>
          {showCancel && (<Button type="button" color="warning" onClick={onCancelClick}>Cancel</Button>)}
        </ButtonGroup>
      </Form>
    );
  }
}
