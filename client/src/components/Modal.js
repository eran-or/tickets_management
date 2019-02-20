import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalContainer extends Component {


  render() {
    const {isOpen, toggle, children, title, footer} = this.props
    const {action, actionText} = footer
    
    return (
      <div>
        <Modal isOpen={!!isOpen} toggle={toggle}>
          <ModalHeader>{title || "Modal title"}</ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={action}>{actionText}</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalContainer