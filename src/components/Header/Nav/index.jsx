import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/Holidaze-logo-without-slogan.png';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';
import ProfileIcon from '../ProfileIcon';

function NavBar() {

    const [accessToken, setAccessToken] = useState(false);
    useEffect(() => {
        setAccessToken(JSON.parse(localStorage.getItem('accessToken')))
    });

    function logout(){
        localStorage.clear();
        window.location.reload();
    }

    return (
        <Navbar fixed="top" expand="lg" className="bg-white">
        <Container fluid>
            <Navbar.Brand>
                <Link to="/">
                    <img src={Logo} className="logo"/>
                </Link>
                </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="ms-auto my-2 my-lg-0" navbarScroll >
                    <Form className="d-flex m-1 shadow rounded-2">
                        <Form.Control type="search" id="search-bar" placeholder="Search" className="me-2" aria-label="Search" />
                    </Form>
                    <NavDropdown title="Filters" id="navbarScrollingDropdown" className='shadow m-1 rounded p-1'>
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                    </NavDropdown>
                    {accessToken ? 
                        <>
                            <Button>Holidaze Your Space</Button>
                            <ProfileIcon />
                            <Button onClick={logout}>Log out</Button>
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