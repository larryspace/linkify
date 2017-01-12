import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

export default class ModalForm extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSubmitClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    form: PropTypes.func.isRequired,
  }

  render() {

    const {
      isOpen,
      toggle,
      onSubmit,
      onSubmitClick,
      disabled,
      title
    } = this.props;

    return (
      <Modal isOpen={ isOpen } toggle={ toggle }>
          <ModalHeader>{ title }</ModalHeader>
          <ModalBody>
            <this.props.form hideSubmit={ true } onSubmit={ onSubmit } />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" disabled={ disabled } onClick={ onSubmitClick }>Submit</Button>{' '}
            <Button color="secondary" onClick={ toggle }>Cancel</Button>
          </ModalFooter>
        </Modal>
    );
  }
}
