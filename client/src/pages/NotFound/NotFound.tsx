import React from "react";
import { useHistory } from "react-router";
import "./NotFound.scss";
import constructionLogo from "../../assets/images/construction.png";

const NotFound: React.FC<any> = () => {
  const history = useHistory();
  const pageName = history.location.pathname.slice(1).split("-").join(" ");
  console.log(pageName);
  return (
    <div className='app-page not-found-page'>
      <div className='wrapper'>
        <img src={constructionLogo}></img>
        <p>{pageName} is Under Construction!</p>
      </div>
    </div>
  );
};

export default NotFound;
