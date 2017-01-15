import React, { Component, PropTypes } from 'react';
import { Form, Input, FormGroup, Col, Label,
  Button, ButtonGroup, Alert, FormFeedback, InputGroupAddon, InputGroup} from 'reactstrap';

import FontAwesome from 'react-fontawesome';

export default ({ input, label, name, type, icon, onChange, meta: { touched, error, warning } }) => {
  if(type === 'file'){
    return (
      <FormGroup row color={touched && (error && 'danger' || warning && 'danger') || ''}>
        <Label for={name} sm={2}>{label}</Label>
        <Col sm={10}>
            <Input {...input} type={type} onChange={event => {onChange(event); input.onChange(event);}} placeholder={label} />

          {touched && ((error && <FormFeedback>{error}</FormFeedback>) || (warning && <FormFeedback>{warning}</FormFeedback>))}
        </Col>
      </FormGroup>
    );
  }

  if(type === 'textarea'){
    return (
      <FormGroup row color={touched && (error && 'danger' || warning && 'danger') || ''}>
        {label && (<Label for={name} sm={2}>{label}</Label>)}
        <Col sm={10}>
          <InputGroup>
            {icon && <InputGroupAddon><FontAwesome name={icon} /></InputGroupAddon>}
            <Input {...input} type={type} placeholder={label} />
          </InputGroup>

          {touched && ((error && <FormFeedback>{error}</FormFeedback>) || (warning && <FormFeedback>{warning}</FormFeedback>))}
        </Col>
      </FormGroup>
    );
  }


  return (
  <FormGroup row color={touched && (error && 'danger' || warning && 'danger') || ''}>
    <Label for={name} sm={2}>{label}</Label>
    <Col sm={10}>
      <InputGroup>
        {icon && <InputGroupAddon><FontAwesome name={icon} /></InputGroupAddon>}
        <Input {...input} type={type} placeholder={label} />
      </InputGroup>

      {touched && ((error && <FormFeedback>{error}</FormFeedback>) || (warning && <FormFeedback>{warning}</FormFeedback>))}
    </Col>
  </FormGroup>)
}
