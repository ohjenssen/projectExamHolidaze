import { Form, NavDropdown } from "react-bootstrap";
import { constants } from "../../../js/constants";
import useApi  from '../../../hooks/useApi';
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchAndFilterbar(){
    const url = constants.BASE_URL + constants.VENUES;
    
    const { data, isLoading, isError } = useApi(url);
    const [inputValue, setInputValue] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        window.location.replace(`/searchpage/${inputValue}`)
    }
    
    function handleInput(event){
        setInputValue(event.target.value);
    }

    const filteredVenues = data.filter((venue) => (
        venue.name.toLowerCase().includes(inputValue.toLowerCase())
    ));

    return (
        <>
            <Form className="d-flex m-1 shadow rounded-2 search-form" onSubmit={handleSubmit}>
                <Form.Control 
                    type="text" 
                    id="search-bar" 
                    placeholder="Search" 
                    className="me-2" 
                    aria-label="Search" 
                    onChange={handleInput}
                />
                <div className="search-suggestions">
                {inputValue && 
                    filteredVenues.map((venue) => (
                        <Link to={`venue/${venue.id}`} className="search-item" key={venue.id}>{venue.name}</Link>
                ))}
                </div>
            </Form>
        </>
    )
}

{/* <Form>
{['checkbox'].map((type, index) => (
    <Form.Check
    key={index}
    inline
    label="Parking"
    name="parking"
    type={type}
    id={`inline-${type}-1`}
  />
))}
</Form> */}