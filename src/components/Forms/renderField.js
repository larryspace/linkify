import React, { Component, PropTypes } from 'react';
import { Form, Input, FormGroup, Col, Label,
  Button, ButtonGroup, Alert, FormFeedback} from 'reactstrap';

export default ({ input, label, name, type, meta: { touched, error, warning } }) => {
  return (
  <FormGroup row color={touched && (error && 'danger' || warning && 'danger') || ''}>
    <Label for={name} sm={2}>{label}</Label>
    <Col sm={10}>
      <Input {...input} type={type} placeholder={label} />
      {touched && ((error && <FormFeedback>{error}</FormFeedback>) || (warning && <FormFeedback>{warning}</FormFeedback>))}
    </Col>
  </FormGroup>)
}
