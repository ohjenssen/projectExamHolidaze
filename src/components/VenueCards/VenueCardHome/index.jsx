import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import PlaceholderImage from '../../../assets/No-Image-Placeholder.svg.png';

export default function VenueCardHome({id, name, price, rating, country, city, media}){

    return(
        <Col className='d-flex flex-column align-items-center justify-content-center card-column'>
            <Card className="holidaze-cards">
            <Link to={`/venue/${id}`} className="card-link">
                <div className="venue-img-container" >
                    <Card.Img variant="top" className="venue-img" src={media[0] ? media[0] : PlaceholderImage} />
                </div>
                <Card.Body>
                    <div className="card-top">
                        <Card.Title>{name}</Card.Title>
                        <div className="card-rating">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                            <p>{rating}</p>
                        </div>
                    </div>
                    <Card.Text>
                        {city}, {country}
                    </Card.Text>
                        <h3>{price}kr</h3>
                </Card.Body>
            </Link>
            </Card>
        </Col>
    )
}