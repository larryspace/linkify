import './forms.scss';

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import {Link} from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Form, Input, FormGroup, Col, Label, Button, ButtonGroup, Alert} from 'reactstrap';

import Container from '../Container';


class LoginForm extends Component {

  submitLogin(e){
    e.preventDefault();
    const username = findDOMNode(this.refs.username).value;
    const password = findDOMNode(this.refs.password).value;
    this.props.loginUser(username, password);
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

  render() {

    if(this.props.isAuthenticating){
      return (<Container>Authenticating...</Container>);
    }

    return (
      <Container>
        <h2>Login</h2>
        <Form onSubmit={e => this.submitLogin(e)}>
          <FormGroup row>
            <Label for="email" sm={2}>Email</Label>
            <Col sm={10}>
              <Input type="text" ref="username" name="username" id="username" placeholder="Username" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>Password</Label>
            <Col sm={10}>
              <Input type="password" ref="password" name="password" id="password" placeholder="Password" />
            </Col>
          </FormGroup>
          <ButtonGroup>
            <Button type="submit" color="primary">Login</Button>
          </ButtonGroup>
        </Form>
        { this.renderError() }
     </Container>
    );
  }
}

export default LoginForm;
