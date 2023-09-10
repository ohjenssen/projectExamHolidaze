import useApi from '../../hooks/useApi';
import { constants } from '../../js/constants';
import { Container, Spinner, Row } from 'react-bootstrap';
import VenueCardHome from '../../components/VenueCards/VenueCardHome';

export default function Home(){
    const url = constants.BASE_URL + constants.VENUES;
    const { data, isLoading, isError } = useApi(url);

    return (
        <Container className='holidaze-cards-container'>
            <Row>
                {isLoading && <Spinner />}
                {isError && <div>Uh oh!</div>}
                {data.map((venue) => (
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
}