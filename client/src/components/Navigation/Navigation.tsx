import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AppLogo from "../../assets/images/logo.png";
import "./Navigation.scss";

const Navigation: React.FC<any> = () => {
  const tabs = ["home", "about"];
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const history = useHistory();

  const handleSelectedTab = (index: number) => {
    setSelectedTab(index);
    history.push(`/${tabs[index]}`);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <div
        onClick={() => handleSelectedTab(index)}
        className={`app-navigation__tab app-navigation__tab${
          selectedTab === index ? "--selected" : ""
        }`}>
        {tab}
      </div>
    ));
  };

  return (
    <div className='app-navigation'>
      <div className='app-logo'>
        <img src={AppLogo} />
      </div>
      {renderTabs()}
    </div>
  );
};
export default Navigation;
