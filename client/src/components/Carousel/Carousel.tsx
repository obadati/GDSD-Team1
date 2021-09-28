import React from "react";
import Carousel from "react-material-ui-carousel";
import { BASE_URL } from "../../constants/constants";
import "./Carousel.scss";

interface CarouselProps {
  // Review: images should have proper types
  images?: any[];
  rounded?: boolean;
}
const CarouselComponent: React.FC<CarouselProps> = ({
  images = [],
  rounded = false,
}) => {
  return (
    <div
      className={`carousel-component carousel-component--${
        rounded ? "rounded" : ""
      }`}>
      <Carousel
        animation='slide'
        interval={2000}
        cycleNavigation
        autoPlay
        indicators={false}>
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
