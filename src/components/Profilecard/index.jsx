import { Button, Card, Form, Modal } from "react-bootstrap";
import { constants } from '../../js/constants';
import useGetProfile from "../../hooks/useGetProfile";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Profilecard(){
    const { profilename } = useParams();
    const url = `${constants.BASE_URL}${constants.PROFILES}/${profilename}`;
    const { profile } = useGetProfile(url);
    const isManager = JSON.parse(localStorage.getItem('venueManager'));

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const options = {
        method: "PUT",
        body: JSON.stringify({ 
            venueManager: true,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        }
    }

    async function submitHandler(event){
        event.preventDefault();
        try {
            const response = await fetch(url, options);
            const json = await response.json();
            console.log(response);
            if(response.ok){
                localStorage.setItem('venueManager', JSON.stringify(json.venueManager));
                window.location.reload();
            }
        } catch (error){
            console.log(error)
        }
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{profile.name}</Card.Title>
                <Card.Text>
                    Mail: {profile.email}
                </Card.Text>

                {isManager ? 
                <p>You is manager</p> :
                    <>
                    <Button variant="primary" onClick={handleShow}>
                        Become venuemanager
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Become a venuemanager?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Prepare for a dazzling jounrey!</Modal.Body>
                            <Modal.Footer>
                                <Form onSubmit={submitHandler}>
                                    <Button variant="primary" type="submit">
                                        Yes
                                    </Button>
                                    <Button variant="danger" onClick={handleClose}>
                                        No
                                    </Button>
                                </Form>
                            </Modal.Footer>
                        </Modal>
                    </>
                }
                <Card.Img variant="top" src={profile.avatar} />
            </Card.Body>
        </Card>
    )
}