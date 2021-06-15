import React, { useState, useEffect } from "react";
import { Developer } from "../../../models/Developer";
import DeveloperCard from "../../../pages/Landing/components/DeveloperCard/DeveloperCard";
import { getDevelopers } from "../../../utility/static";

//import "./Landing.scss";
const Team: React.FC<any> = () => {
    const developers: Developer[] = getDevelopers();

    const renderDeveloperCards = () => (
        <div className='card-wrapper'>
          {developers.map((developer) => (
            <DeveloperCard
              key={`developer-card-${developer.name}`}
              name={developer.name}
              tagline={developer.tagline}
              description={developer.description}
              imgUrl={developer.imgUrl}
            />
          ))}
        </div>
      );

    const style = {
        width: "100%",
        height: "auto",
      };
    
      return (
        
          <div className="container">
             <div className='landing-page'>
      <section className='team'>
        <hr></hr>
        <h1 className='our-team-label'>OUR TEAM</h1>
        {renderDeveloperCards()}
      </section>
    </div>
          </div>
       
      );
  };
  export default Team;
  