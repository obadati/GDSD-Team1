import React from "react";
import { useHistory } from "react-router";
import { BASE_URL } from "../../api/properties";
import CarouselComponent from "../../components/Carousel/Carousel";
import { Property } from "../../store/properties/types";
import Hero from "../Home/components/Hero/Hero";
import "./PropertyDetail.scss";

const PropertyDetail: React.FC<any> = () => {
  const history = useHistory();
  const property: Property = (history.location.state as any).property;

  return (
    <div className='property-detail-page app-page'>
      <div className='aside'>Aside</div>
      <div className='center'>
        <h3 className='property-detail-page__title'>{property.title}</h3>
        <div className='image-gallery-wrapper'>
          <CarouselComponent
            images={[
              "assests/uploads/propertyImage/property-1621610048377.jpg",
              "assests/uploads/propertyImage/property-1621609809384.jpg",
              "assests/uploads/propertyImage/property-1621609358303.jpg",
            ]}
          />
        </div>
        <div className='description'>
          <h3>{property.category.name}</h3>
          <p>{property.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
