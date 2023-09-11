import { useState } from 'react';
import BookingForm from '../Forms/BookingForm';
import { Modal, Button } from 'react-bootstrap';

export default function BookingModal({handleSubmit}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <Button variant="primary" onClick={handleShow}>
            Book
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Book this venue?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BookingForm handleSubmit={handleSubmit}/>
            </Modal.Body>
        </Modal>
    </>
  );
};