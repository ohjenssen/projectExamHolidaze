import PlaceHolderImage from '../../assets/No-Image-Placeholder.svg.png';
import useApi from "../../hooks/useApi";
import { constants } from "../../js/constants";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import CarouselSlide from '../../components/CarouselSlide'
import GuestCounter from '../../components/Counter';

export default function OtherVenueSpecific(){
    const { id } = useParams();
    const url = `${constants.BASE_URL +  constants.VENUES}/${id}`;

    const { data, isLoading, isError } = useApi(url);
    console.log(data);
    const hasImages = data?.media && data.media.length > 0;

    return (
        <Container>
            <Row>
                {isLoading && <Spinner />}
                {isError && <div>Uh oh! Error message!</div>}
                {data && 
                <Col className="single-card">
                    <h1>{data.name}</h1>
                    {data.location && 
                        <h4>{data.location.city}, {data.location.country}</h4>
                    }
                    {hasImages ? 
                        (<CarouselSlide media={data.media}/>) : 
                        (<div className="venue-img-container">
                            <img src={PlaceHolderImage} className='venue-img'/>
                        </div>
                    )}
                    <div>
                        <h4>Max guests: {data.maxGuests}</h4>
                        <p>How many guests: </p>
                        <GuestCounter />
                    </div>
                </Col>
            }
            </Row>
            <Row>
            </Row>
        </Container>
    )
}