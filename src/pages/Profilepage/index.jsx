import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Profilecard from '../../components/Profilecard';

export default function Profilepage(){
    const isManager = JSON.parse(localStorage.getItem('venueManager'));

    return (
            <Row>
                <Col className='profile-page'>
                    <div className='profile-nav-links'>
                        <Link to={`/profilepage/${JSON.parse(localStorage.getItem("profileName"))}`}>Profile</Link>
                        <Link to={`/mybookings/${JSON.parse(localStorage.getItem('profileName'))}`}>Bookings</Link>
                       {isManager && <Link>Venues</Link>}
                    </div>
                    <Profilecard />
                </Col>
            </Row>
    )
}