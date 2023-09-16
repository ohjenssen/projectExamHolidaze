import { Col, Card, Modal, Form, Button} from 'react-bootstrap';
import { useState } from 'react';
import { constants } from '../../js/constants';

export default function DeleteVenue({id}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const url = `${constants.BASE_URL + constants.VENUES}/${id}`;

    const options = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        }
    }

    async function deleteVenue(event){
        event.preventDefault();
        const response = await fetch(url, options);
        window.location.reload();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose} className='modal-dialog-centered'>
                <Modal.Header closeButton>
                    <Modal.Title>Delete venue?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Once deleted, the venue cannot be restored.</Modal.Body>
                <Modal.Footer>
                    <Form onSubmit={deleteVenue}>
                        <Button variant="danger" type="submit">
                            Delete
                        </Button>
                        <Button variant="primary"  onClick={handleClose}>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Footer>
            </Modal>
        </>
    )
}