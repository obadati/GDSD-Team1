import React from "react";
import Carousel from "react-material-ui-carousel";
import { BASE_URL } from "../../api/properties";
import "./Carousel.scss";

interface CarouselProps {
  images?: any[];
}
const CarouselComponent: React.FC<CarouselProps> = ({ images = [] }) => {
  return (
    <div className='carousel-component'>
      <Carousel autoPlay>
        {images.map((item, i) => (
          <div className='slide' key={i}>
            <img src={`${BASE_URL}/${item}`}></img>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
