import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
      // <Link to={`/${tabs[index]}`}>
      <div
        onClick={() => handleSelectedTab(index)}
        className={`app-navigation__tab app-navigation__tab${
          selectedTab === index ? "--selected" : ""
        }`}>
        {tab}
      </div>
      // </Link>
    ));
  };

  return <div className='app-navigation'>{renderTabs()}</div>;
};
export default Navigation;
