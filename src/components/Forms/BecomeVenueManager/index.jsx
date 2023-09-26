import { constants } from "../../../js/constants";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BecomeVenuemanager(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const isManager = JSON.parse(localStorage.getItem('venueManager'));
    const { profilename } = useParams();
    const url = `${constants.BASE_URL}${constants.PROFILES}/${profilename}`;


    const options = {
        method: "PUT",
        body: JSON.stringify({ 
            venueManager: isManager ? false : true,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        }
    }

    async function becomeVenueManager(event){
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
        <>
            {isManager ? 
                    <div className="profile-info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-check-fill" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                            <path d="m8 3.293 4.712 4.712A4.5 4.5 0 0 0 8.758 15H3.5A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.707l.547.547 1.17-1.951a.5.5 0 1 1 .858.514Z"/>
                        </svg> 
                        <p>Venuemanager</p>
                        <Button variant="primary" className="profile-edit-btn" onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                            </svg>
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Stop being a venuemanager?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>You can always beceome one again.</Modal.Body>
                            <Modal.Footer>
                                <Form onSubmit={becomeVenueManager}>
                                    <Button variant="primary" type="submit">
                                        Yes
                                    </Button>
                                    <Button variant="danger" onClick={handleClose}>
                                        No
                                    </Button>
                                </Form>
                            </Modal.Footer>
                        </Modal>
                    </div> 
                    :
                    <>
                        <Button variant="primary" className="btn-pink" onClick={handleShow}>
                            Become venuemanager
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Become a venuemanager?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Prepare for a dazzling jounrey!</Modal.Body>
                            <Modal.Footer>
                                <Form onSubmit={becomeVenueManager}>
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
        </>
    )
}