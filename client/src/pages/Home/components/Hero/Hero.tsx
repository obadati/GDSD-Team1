import React from "react";
import { CTA } from "../../../../utility/types";
import "./Hero.scss";

import fallbackImage from "../../../../assets/images/hero-fallback-2.jpg";

export interface HeroProps {
  heading: string;
  description: string;
  backgroundImage?: string;
  cta?: CTA;
}

const Hero: React.FC<HeroProps> = ({
  heading,
  description,
  backgroundImage = fallbackImage,
  cta,
}) => {
  return (
    <div
      className='app-hero'
      style={{
        background: `linear-gradient(#00000085, transparent), url(${backgroundImage})`,
      }}>
      <h3 className='app-hero__heading'>{heading}</h3>
      <p className='app-hero__description'>{description}</p>
      {cta && <button className='app-hero__cta'>{cta.label}</button>}
    </div>
  );
};

export default Hero;
