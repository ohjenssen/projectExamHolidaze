import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RegisterForm from '../RegisterForm';

function RegisterModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className='m-1 shadow btn-pink'>Register</Button>

      <Modal className='modal-dialog modal-dialog-centered fixed-top' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <RegisterForm />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RegisterModal;