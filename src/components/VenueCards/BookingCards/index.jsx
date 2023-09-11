import { useState } from 'react';
import { Button, Card, Col, Modal, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import PlaceholderImage from '../../../assets/No-Image-Placeholder.svg.png';
import { constants } from "../../../js/constants";

export default function BookingCards({id, from, to, guests, venue}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const url = `${constants.BASE_URL + constants.BOOKINGS}/${id}`;

    const options = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        }
    }

    async function deleteBooking(event){
        event.preventDefault();
        const response = await fetch(url, options);
        // Just reload since theres no response object
        window.location.reload();
    }
    
    return (
            <Col className='d-flex flex-column align-items-center justify-content-center card-column'>
                <Card className="holidaze-cards">
                    <Link to={`/venue/${venue.id}`} className="card-link">
                        <div className="venue-img-container" >
                            <Card.Img variant="top" className="venue-img" src={venue.media[0] ? venue.media[0] : PlaceholderImage} />
                        </div>
                        <Card.Body>
                            <div className="card-top">
                                <Card.Title className="venue-title">{venue.name}</Card.Title>
                                <div className="card-rating">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                    <p>{venue.rating}</p>
                                </div>
                            </div>
                            <Card.Text>
                                <p className="venue-adress">{venue.location.city}, {venue.location.country}</p>
                                <p>From: {new Date(from).toLocaleDateString()}</p>
                                <p>To: {new Date(to).toLocaleDateString()}</p>
                            </Card.Text>
                        </Card.Body>
                    </Link>
                    <div className="venue-btn-container">
                        {/* <Button className="update-btn">Update</Button> */}
                        
                        
                        <Button variant="primary" onClick={handleShow}>
                            Delete
                        </Button>

                        <Modal show={show} onHide={handleClose} className='modal-dialog-centered'>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete booking?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Once deleted, the booking cannot be restored.</Modal.Body>
                            <Modal.Footer>
                                <Form>
                                    <Button variant="danger" type="submit" onClick={deleteBooking}>
                                        Delete
                                    </Button>
                                    <Button variant="primary"  onClick={handleClose}>
                                        Cancel
                                    </Button>
                                </Form>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Card>
            </Col>
    )
}