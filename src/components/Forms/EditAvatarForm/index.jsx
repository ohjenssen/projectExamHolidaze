import { constants } from "../../../js/constants";
import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function EditAvatarForm(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { profilename } = useParams();
    const url = `${constants.BASE_URL}${constants.PROFILES}/${profilename}/media`;
    const [avatarUrl, setAvatarUrl] = useState('');


    const options = {
        method: "PUT",
        body: JSON.stringify({ 
            avatar: avatarUrl
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        }
    }

    function changeHandler(event){
        setAvatarUrl(event.target.value)
    }

    async function editAvatar(event){
        event.preventDefault();
        try {
            const response = await fetch(url, options);
            const json =  await response.json();
            if(response.ok){
                localStorage.setItem('avatar', JSON.stringify(avatarUrl));
                window.location.reload();
            }
        } catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <Button className="mt-3" onClick={handleShow}>
                Edit avatar
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update avatar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>New avatar</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="newavatar.url/example"
                        autoFocus
                        value={avatarUrl}
                        onChange={changeHandler}
                    />
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Form onSubmit={editAvatar}>
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
    )
}