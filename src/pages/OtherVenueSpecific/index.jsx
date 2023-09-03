import PlaceHolderImage from '../../assets/No-Image-Placeholder.svg.png';
import useApi from "../../hooks/useApi";
import { constants } from "../../js/constants";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import CarouselSlide from '../../components/CarouselSlide'
import GuestCounter from '../../components/Counter';
import Button from 'react-bootstrap/Button';
import MyDatePicker from '../../components/MyDatePicker';

export default function OtherVenueSpecific(){
    const { id } = useParams();
    const url = `${constants.BASE_URL +  constants.VENUES}/${id}?_bookings=true`;
    const { data, isLoading, isError } = useApi(url);
    const hasImages = data?.media && data.media.length > 0;

    return (
        <Container>
                {isLoading && <Spinner />}
                {isError && <div>Uh oh! Error message!</div>}
                {data && 
                <>
                    <Row>
                        <Col className="single-card">
                            <div>
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
                                <div className='venue-information-container-1'>
                                    <div>                 
                                        <h4>Max guests: {data.maxGuests}</h4>
                                        <div className='guests-container'>
                                            <p>How many guests: </p>
                                            <GuestCounter />
                                        </div>
                                        <p>Price:</p>
                                        <h3>{data.price}kr</h3>
                                    </div>
                                    <div className='venue-information-booking'>
                                        <div className="card-rating">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                            <p>{data.rating}</p>
                                        </div>
                                        <Button>Book</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="single-card">
                            <h4>Dates</h4>
                            <a>See bookings</a>
                            <MyDatePicker bookings={data.bookings}/>
                        </Col>
                    </Row>
                </>
            }
        </Container>
    )
}