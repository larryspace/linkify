import './LoginForm.css';

import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Form, Input, FormGroup, Col, Label, Button, ButtonGroup } from 'reactstrap';

import Container from '../page';


class LoginForm extends Component {
  render() {
    return (
      <Container>
        <h2>Login</h2>
        <Form>
          <FormGroup row>
            <Label for="email" sm={2}>Email</Label>
            <Col sm={10}>
              <Input type="email" name="email" id="username" placeholder="Usernamer" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>Password</Label>
            <Col sm={10}>
              <Input type="password" name="password" id="password" placeholder="Password" />
            </Col>
          </FormGroup>
          <ButtonGroup>
            <Button type="submit" color="primary">Login</Button>
          </ButtonGroup>
        </Form>
     </Container>
    );
  }
}

export default LoginForm;
