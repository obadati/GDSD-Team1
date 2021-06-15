import React from "react";
import "./CustomLoader.scss";
import AppLogo from "../../assets/images/logo.png";

const LoaderComponent: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className="app-loader">
            <div className="app-loader__inner">
                <div className="loader-logo">
                    <img src={AppLogo} />
                </div>
                <div>{title}</div>
            </div>
        </div>
    );
};

export default LoaderComponent;
