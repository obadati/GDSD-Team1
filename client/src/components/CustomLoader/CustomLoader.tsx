import React from "react";
import "./CustomLoader.scss";
import AppLogo from "../../assets/images/logo.png";

const LoaderComponent: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className='app-loader'>
      <div className='app-loader__inner'>
        {/* <div className='loader-logo'>Home For Me!</div> */}
        <div className='progress'>
          <div
            className='progress-bar progress-bar-striped progress-bar-animated'
            role='progressbar'
            area-aria-valuenow='100'
            area-aria-valuemin='0'
            area-aria-valuemax='100'
            style={{ width: "500px" }}></div>
        </div>
        <div>{title}</div>
      </div>
    </div>
  );
};

export default LoaderComponent;
