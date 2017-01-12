import React, { Component } from 'react';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

export default class ModalForm extends Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.toggle}>New Link</ModalHeader>
          <ModalBody>
            <this.props.form hideSubmit={ true } onSubmit={this.props.onSubmit} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" disabled={ this.props.disabled } onClick={this.props.onSubmitClick}>Submit</Button>{' '}
            <Button color="secondary" onClick={ this.props.toggle }>Cancel</Button>
          </ModalFooter>
        </Modal>
    );
  }
}
