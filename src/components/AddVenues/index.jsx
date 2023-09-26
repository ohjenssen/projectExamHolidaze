import { constants } from "../../js/constants";
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function AddVenues({buttonText}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [imageUrl, setImageUrl] = useState("");
    const url = constants.BASE_URL + constants.VENUES;
    const [errorMessage, setErrorMessage] = useState('');

    const [venueInfo, setVenueInfo] = useState({
        name: "",
        description: "",
        maxGuests: 0,
        price: 0,
        media: [],       
        meta: {
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false,
        },
        location: {
            address: "",
            city: "",
            zip: "",
            country: "",
            continent: "",
        }
    })

    const options = {
        method: "POST",
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
    }

    function changeLocationHandler(event){
        const { name, value } = event.target;
        setVenueInfo((previousVenueInfo) => ({
            ...previousVenueInfo,
            location: {
                ...previousVenueInfo.location,
                [name]: value,
            }
        }))
    }

    function handleCheckBoxChange(event){
        const { name, checked } = event.target;
        setVenueInfo((previousVenueInfo) => ({
            ...previousVenueInfo,
            meta: {
                ...previousVenueInfo.meta,
                [name]: checked,
            },
        }));
    }

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
            const json = await response.json();
            if(response.ok){
                window.location.reload()
            } else if(!response.ok){
                setErrorMessage(json.errors);
            }
            console.log(json);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
             <Button variant="primary" onClick={handleShow} className="m-1 custom-header-btn btn-pink">
                    {buttonText ? buttonText : 'Add venue'}
            </Button>

            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create venue</Modal.Title>
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
                                <Form.Group className="mb-3" controlId="formAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter address" 
                                        name="address"
                                        value={location.address}
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
                                    Create
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