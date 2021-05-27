import React from "react";
import { CTA } from "../../../../utility/types";
import "./TrendingPropertyCard.scss";

const fallbackImg = `http://18.185.96.197:5000/assests/uploads/propertyImage/property-1621609358303.jpg`;

export interface TrendingCardProps {
  heading: string;
  description: string;
  cta?: CTA;
  thumbnail?: string;
}

const TrendingPropertyCard: React.FC<TrendingCardProps> = ({
  heading,
  description,
  cta,
  thumbnail,
}) => {
  return (
    <div className='trending-property-card'>
      <h3 className='trending-property-card__heading'>{heading}</h3>
      <div className='trending-property-card__content'>
        <div className='trending-property-card__content__description'>
          {description}
        </div>
        <div className='trending-property-card__content__image-wrapper'>
          <img src={thumbnail || fallbackImg} alt='' />
        </div>
      </div>
      {cta && (
        <button
          onClick={cta.handler}
          className='trending-property-card__content__cta'>
          {cta.label}
        </button>
      )}
    </div>
  );
};

export default TrendingPropertyCard;
