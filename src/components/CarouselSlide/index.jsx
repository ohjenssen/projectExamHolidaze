import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PlaceHolderImage from '../../assets/No-Image-Placeholder.svg.png';

function CarouselSlide({media}) {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {media && media.map((imgSrc) => (
                <Carousel.Item key={imgSrc}>
                    <div className='carousel-image-container'>
                        <img src={imgSrc} className='carousel-image'/>
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CarouselSlide;