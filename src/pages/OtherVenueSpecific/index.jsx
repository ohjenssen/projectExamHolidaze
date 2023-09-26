import PlaceHolderImage from '../../assets/No-Image-Placeholder.svg.png';
import useApi from "../../hooks/useApi";
import { constants } from "../../js/constants";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import CarouselSlide from '../../components/CarouselSlide'
import GuestCounter from '../../components/Counter';
import MyDatePicker from '../../components/MyDatePicker';
import BookingModal from '../../components/BookingModal';
import { useState, useEffect } from 'react';

export default function OtherVenueSpecific(){
    const { id } = useParams();
    const url = `${constants.BASE_URL}${constants.VENUES}/${id}?_bookings=true`;
    const bookUrl = `${constants.BASE_URL}${constants.BOOKINGS}`;
    const { data, isLoading, isError } = useApi(url);
    const hasImages = data?.media && data.media.length > 0;
    const [selectedDate, setSelectedDate] = useState(null);
    const [numberOfGuests, setNumberOfGuests] = useState(0);
    const [reservationInfo, setReservationInfo] = useState({});

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleCounterChange = (count) => {
        setNumberOfGuests(count);
    }

    async function handleSubmit(event){
        event.preventDefault();
        const startDate = new Date(selectedDate.from.year, selectedDate.from.month - 1, selectedDate.from.day).toISOString();
        const endDate = new Date(selectedDate.to.year, selectedDate.to.month - 1, selectedDate.to.day).toISOString();
        
        const newReservationInfo = {
            dateFrom: startDate,
            dateTo: endDate,
            guests: numberOfGuests,
            venueId: id,
        }

        setReservationInfo(newReservationInfo);

    }

    useEffect(() => {
        if (Object.keys(reservationInfo).length > 0) {
          const options = {
            method: "POST",
            body: JSON.stringify(reservationInfo),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Authorization": `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
            }
          };
      
          const makeBooking = async () => {
            try {
              const response = await fetch(bookUrl, options);
              console.log(await response.json());
              if (response.ok) {
                window.location.replace(`/mybookings/${JSON.parse(localStorage.getItem('profileName'))}`);
              }
            } catch (error) {
              console.log(error);
            }
          };
      
          makeBooking();
        }
    }, [reservationInfo, bookUrl]);

    return (
        <Container>
            {isLoading && <Spinner />}
            {isError && <div>Uh oh! Error message!</div>}
            {data && 
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
                                        <GuestCounter onCounterChange={handleCounterChange}/>
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
                                    <BookingModal handleSubmit={handleSubmit}>Book</BookingModal>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className="single-card">
                        <h4>Dates</h4>
                        <a>See bookings</a>
                        <MyDatePicker bookings={data.bookings} onSelectDate={handleDateChange}/>
                        <h4>Description</h4>
                        <p>{data.description}</p>
                        {data.meta &&
                            <div>
                                <p>Breakfast: {data.meta.breakfast ? 'Yes' : 'No'}</p>
                                <p>Parking {data.meta.parking ? 'Yes' : 'No'}</p>
                                <p>Pets: {data.meta.pets ? 'Yes' : 'No'}</p>
                                <p>Wifi: {data.meta.wifi ? 'Yes' : 'No'}</p>
                            </div>
                        }
                        <h4>Location</h4>
                        {data.location &&
                            <div>
                                <p>Adress: {data.location.address}</p>
                                <p>Zip: {data.location.zip}</p>
                                <p>City: {data.location.city}</p>
                                <p>Country: {data.location.country}</p>
                            </div>
                        }
                    </Col>
                </Row>
            }
        </Container>
    )
}