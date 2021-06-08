import React from "react";
import { Property } from "../../../../store/properties/types";
import { BASE_URL } from "../../../../api/properties";
import "./PropertyCard.scss";
import { useHistory } from "react-router";
import { AppRoutes } from "../../../../containers/Router/routes";

interface OwnProps {
  property: Property;
}

const PropertyCard: React.FC<OwnProps> = ({ property }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(AppRoutes.PropertyDetail.replace(":uid", property.id), {
      property,
    });
  };

  return (
    <div className='property-card' onClick={handleClick}>
      <div className='property-card__thumbnail'>
        <img src={`${BASE_URL}/${property.images}`} alt='no img' />
      </div>
      <div className='property-card__content'>
        <p className='property-card__content__name'>{property.title}</p>
        <p className='property-card__content__location'>{property.location}</p>
        <p className='property-card__content__price'>€ {property.price}</p>
        <div className='tags'>
          <span className='property-card__content__tag property-card__content__tag--category'>
            {property.category.name}
          </span>
          <span className='property-card__content__tag property-card__content__tag--size'>
            {property.size} sqm
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
