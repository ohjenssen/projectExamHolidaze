import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { Container } from 'react-bootstrap';

export default function Layout(){
    return (
    <>
        <Header />
        <Container>
            <Outlet />
        </Container>
    </>
    )
}