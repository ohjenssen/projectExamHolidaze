import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { constants } from '../../js/constants';
import useGetBookingsByProfile from '../../hooks/useGetBookingsByProfile';
import BookingCards from '../../components/VenueCards/BookingCards';

export default function MyBookingsPage(){
    const options = {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        }
    }

    const profileName = JSON.parse(localStorage.getItem('profileName'));
    const url = `${constants.BASE_URL + constants.PROFILES}/${profileName}/bookings?_venue=true`;
    const { data, isLoading, isError } = useGetBookingsByProfile(url, options);
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
                {data.map((booking) => (
                        <BookingCards 
                            key={booking.id}
                            id={booking.id}
                            from={booking.dateFrom} 
                            to={booking.dateTo}
                            guests={booking.guests}
                            venue={booking.venue}
                        />
                    ))}
            </Row>
        </>
    )
}