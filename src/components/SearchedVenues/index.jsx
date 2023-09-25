import { useParams } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Spinner, Form } from "react-bootstrap";
import { constants } from "../../js/constants";
import useApi from "../../hooks/useApi";
import VenueCardHome from "../VenueCards/VenueCardHome";

export default function SearchedVenues(){
    const { searchValue }= useParams();
    const [url, setUrl] = useState(constants.BASE_URL + constants.VENUES);

    const { data, isLoading, isError } = useApi(url);
    const filteredVenues = data.filter((venue) => (
        venue.name.toLowerCase().includes(searchValue.toLowerCase())
    ));

    console.log(filteredVenues[0].meta);

    return (
        <Container className='holidaze-cards-container'>
            <Row>
                <h3>Search results for "{searchValue}"</h3>
            </Row>
            <Row>
                {isLoading && <Spinner />}
                {isError && <div>Uh oh!</div>}
                {filteredVenues.map((venue) => (
                        <VenueCardHome 
                            key={venue.id} 
                            id={venue.id}
                            name={venue.name}
                            price={venue.price}
                            rating={venue.rating}
                            country={venue.location.country}
                            city={venue.location.city}
                            media={venue.media}
                        />
                ))}
            </Row>
        </Container>
    )
};