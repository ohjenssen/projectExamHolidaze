import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/Holidaze-logo-without-slogan.png';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';
import ProfileIcon from '../ProfileIcon';
import SearchAndFilterbar from '../SearchAndFilterbar';
import AddVenues from '../../AddVenues';

function NavBar() {

    const [accessToken, setAccessToken] = useState(false);

    useEffect(() => {
        setAccessToken(JSON.parse(localStorage.getItem('accessToken')))
    }, []);

    function logout(){
        localStorage.clear();
        window.location.replace('/');
    }

    return (
        <Navbar fixed="top" expand="md" className="bg-white">
        <Container fluid>
            <Navbar.Brand>
                <Link to="/">
                    <img src={Logo} className="logo"/>
                </Link>
                </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="ms-auto my-2 my-md-0" navbarScroll >
                    <SearchAndFilterbar />
                    {accessToken ? 
                        <>
                            <AddVenues buttonText={'Holidaze Your Space'} />
                            <Link to={`/profilepage/${JSON.parse(localStorage.getItem("profileName"))}`}>
                                <ProfileIcon />
                            </Link>
                            <Button onClick={logout} className='m-1 custom-header-btn'>Log out</Button>
                        </> :
                        <>
                            <LoginModal />
                            <RegisterModal />
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default NavBar;