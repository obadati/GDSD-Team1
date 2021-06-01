import React from "react";
import { Developer } from "../../models/Developer";
import DeveloperCard from "./components/DeveloperCard/DeveloperCard";
import { getDevelopers } from "../../utility/static";
import "./Landing.scss";

const LandingPage: React.FC<any> = () => {
  const developers: Developer[] = getDevelopers();

  const renderIntro = (): JSX.Element => (
    <>
      <h3>Global Distributed Software Development</h3>
      <h3>Summer 2021</h3>
      <h3>Team 1</h3>
      <h3>Milestone 0 : (About Page)</h3>
    </>
  );

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

  return (
    <div className='landing-page'>
      <section className='team'>
        <hr></hr>
        <h1 className='our-team-label'>OUR TEAM</h1>
        {renderDeveloperCards()}
      </section>
    </div>
  );
};

export default LandingPage;
