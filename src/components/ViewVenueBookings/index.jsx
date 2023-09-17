import { Button, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import useGetBookingsByVenue from "../../hooks/useGetBookingsByVenue";

export default function ViewVenueBookings({id, name}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { data, isLoading, isError } = useGetBookingsByVenue(id);
    return (
        <>
            <Button onClick={handleShow}>View bookings</Button>

            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Bookings for {name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isLoading && <Spinner/>}
                        {data.length > 0 ? 
                            data.map((booking, index) => (
                                <div key={booking.id} className="booking-card">
                                    <h4>Booking {index + 1}</h4>
                                    <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                                    <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                                    <p>Guests: {booking.guests}</p>
                                    <p>Last updated: {new Date(booking.updated).toLocaleDateString()}</p>
                                </div>
                            ))
                            : <p>You have no bookings yet.</p>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
        </>
    )
}