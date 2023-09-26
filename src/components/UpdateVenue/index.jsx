import { Modal, Form, Button } from "react-bootstrap"
import { useState } from "react";
import { constants } from "../../js/constants";

export default function UpdateVenue({venue}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [imageUrl, setImageUrl] = useState("");
    const url = `${constants.BASE_URL + constants.VENUES}/${venue.id}`;

    const [venueInfo, setVenueInfo] = useState({
        name: venue.name,
        description: venue.description,
        maxGuests: venue.maxGuests,
        price: venue.price,
        media: venue.media,
        meta: venue.meta,
        location: venue.location,
    });

    const options = {
        method: "PUT",
        body: JSON.stringify(venueInfo),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
        }
    }

    const { name, description, maxGuests, price, media, meta, location } = venueInfo;

    function changeHandler(event){
        if (event.target.name === 'maxGuests' || event.target.name === 'price'){
            setVenueInfo({...venueInfo, [event.target.name] : parseInt(event.target.value)})
        } else {
            setVenueInfo({...venueInfo, [event.target.name] : event.target.value});
        }
    };

    function changeLocationHandler(event){
        const { name, value } = event.target;
        setVenueInfo((previousVenueInfo) => ({
            ...previousVenueInfo,
            location: {
                ...previousVenueInfo.location,
                [name]: value,
            }
        }))
    };

    function handleCheckBoxChange(event){
        const { name, checked } = event.target;
        setVenueInfo((previousVenueInfo) => ({
            ...previousVenueInfo,
            meta: {
                ...previousVenueInfo.meta,
                [name]: checked,
            },
        }));
    };

    function imageChangeHandler(event){
        setImageUrl(event.target.value)
    }

    function addImages(){
        media.push(imageUrl);
        setImageUrl("");
    };

    async function handleSubmit(event){
        event.preventDefault();
        console.log(venueInfo)
        try {
            const response = await fetch(url, options);
            if(response.ok){
                window.location.reload();
            }
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <>
            <Button className="update-btn" onClick={handleShow}>Update venue</Button>
            
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update venue</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit} className="custom-form">

                            <div className="input-container">
                                <Form.Group className="mb-3" controlId="formTitle">
                                    <Form.Label>Venue Title *</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter title" 
                                        name="name"
                                        value={name}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Description *</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        placeholder="Enter description" 
                                        name="description"
                                        value={description}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGuests">
                                    <Form.Label>Max guests *</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="Enter max guests" 
                                        name="maxGuests"
                                        value={maxGuests}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPrice">
                                    <Form.Label>Enter price *</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="Enter price"
                                        name="price"
                                        value={price}
                                        onChange={changeHandler} 
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formMedia">
                                        <Form.Label>Venue images(must be url link)</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="https://imagelink.com/image"
                                            value={imageUrl}
                                            onChange={imageChangeHandler}
                                        />
                                        <Button onClick={addImages} className="add-img-btn">Add image</Button>
                                </Form.Group>

                                <div className="form-checks">
                                    <div>
                                        <Form.Group className="mb-3" controlId="formWifi">
                                            <Form.Check 
                                                type="checkbox" 
                                                label="Wifi" 
                                                name="wifi"
                                                checked={meta.wifi}
                                                onChange={handleCheckBoxChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formParking">
                                            <Form.Check 
                                                type="checkbox" 
                                                label="Parking" 
                                                name="parking"
                                                checked={meta.parking}
                                                onChange={handleCheckBoxChange}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div>
                                        <Form.Group className="mb-3" controlId="formPets">
                                            <Form.Check 
                                                type="checkbox" 
                                                label="Pets" 
                                                name="pets"
                                                checked={meta.pets}
                                                onChange={handleCheckBoxChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBreakfast">
                                            <Form.Check 
                                                type="checkbox" 
                                                label="Breakfast" 
                                                name="breakfast"
                                                checked={meta.breakfast}
                                                onChange={handleCheckBoxChange}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>

                                <div className="input-container">
                                    <Form.Group className="mb-3" controlId="formAdress">
                                        <Form.Label>Adress</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter adress" 
                                            name="address"
                                            value={location.adress}
                                            onChange={changeLocationHandler}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter city" 
                                            name="city"
                                            value={location.city}
                                            onChange={changeLocationHandler}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formZip">
                                        <Form.Label>Zip</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter zip" 
                                            name="zip"
                                            value={location.zip}
                                            onChange={changeLocationHandler}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formCountry">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter country" 
                                            name="country"
                                            value={location.country}
                                            onChange={changeLocationHandler}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formContinent">
                                        <Form.Label>Continent</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter continent" 
                                            name="continent"
                                            value={location.continent}
                                            onChange={changeLocationHandler}
                                        />
                                    </Form.Group>
                                    <Button className="btn-pink" type="submit">
                                        Update
                                    </Button>
                                </div>
                            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
        </>
    )
}