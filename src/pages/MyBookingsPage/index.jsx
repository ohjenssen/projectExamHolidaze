import { Col, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserBookings from '../../components/UserBookings';
import { constants } from '../../js/constants';
import useGetBookingsByProfile from '../../hooks/useGetBookingsByProfile';
import BookingCards from '../../components/VenueCards/BookingCards';

export default function MyBookingsPage(){
    const isManager = JSON.parse(localStorage.getItem('venueManager'));

    return (
        <>
            <Row>
                <Col className='profile-page'>
                    <div className='profile-nav-links'>
                        <Link className="links" to={`/profilepage/${JSON.parse(localStorage.getItem("profileName"))}`}>Profile</Link>
                        <Link className="active" to={`/mybookings/${JSON.parse(localStorage.getItem('profileName'))}`}>Bookings</Link>
                        {isManager && <Link className="links" to={`/uservenues/${JSON.parse(localStorage.getItem('profileName'))}`}>Venues</Link>}
                    </div>
                    <h1>These are your bookings</h1>
                </Col>
            </Row>
            <Row className='d-flex'>
                <UserBookings />
            </Row>
        </>
    )
}