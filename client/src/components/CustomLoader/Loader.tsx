import React from "react";
import "./Loader.scss";
import AppLogo from "../../assets/images/logo.png";

const LoaderComponent: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div>
            <div className="loader-img">
                <img src={AppLogo} />
            </div>
            <div>{title}</div>
        </div>
    );
};

export default LoaderComponent;
