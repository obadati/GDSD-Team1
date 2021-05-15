import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Developer } from "../../models/Developer";
import { dummyDeveloper, getRandomBg } from "../../utility/static";

import "./About.scss";

const AboutPage: React.FC<any> = () => {
  const history = useHistory();
  const [developer, setDeveloper] = useState<Developer>(dummyDeveloper);

  useEffect(() => {
    if (history.location.state) {
      setDeveloper((history.location.state as any).developer);
    }
  }, [history]);

  return (
    <div
      className='about-page'
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.65)), url(${getRandomBg()})`,
      }}>
      <div className='avatar'>
        <img src={developer.imgUrl} />
      </div>
      <p className='tagline'>{developer.tagline}</p>
      <p className='name'>{developer.name}</p>
      <p className='description'>{developer.description}</p>
    </div>
  );
};

export default AboutPage;
