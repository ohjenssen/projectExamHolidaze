import { Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import MyVenues from "../../components/MyVenues";
import AddVenues from "../../components/AddVenues";

export default function UserVenues(){

    return (
        <>
        <Row>
            <Col className='profile-page'>
                <div className='profile-nav-links'>
                    <Link className="links" to={`/profilepage/${JSON.parse(localStorage.getItem("profileName"))}`}>Profile</Link>
                    <Link className="links" to={`/mybookings/${JSON.parse(localStorage.getItem('profileName'))}`}>Bookings</Link>
                    <Link className="active" to={`/uservenues/${JSON.parse(localStorage.getItem('profileName'))}`}>Venues</Link>
                </div>
                <AddVenues />
                <h1>These are your venues</h1>
            </Col>
        </Row>

        <Row className="d-flex">
                <MyVenues />
        </Row>
        </>
    )
}