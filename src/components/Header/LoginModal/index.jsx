import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoginForm from '../LoginForm';

function LoginModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className='m-1 shadow'>Log in</Button>

      <Modal className='modal-dialog modal-dialog-centered fixed-top' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <LoginForm />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;