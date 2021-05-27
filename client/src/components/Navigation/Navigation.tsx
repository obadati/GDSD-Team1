import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AppLogo from "../../assets/images/logo.png";
import { AppRoutes } from "../../containers/Router/routes";
import "./Navigation.scss";

export interface NavigationTab {
  label: string;
  to: AppRoutes;
}

const Navigation: React.FC<any> = () => {
  const tabs: NavigationTab[] = [
    { label: "home", to: AppRoutes.Home },
    { label: "about", to: AppRoutes.About },
    { label: "find property", to: AppRoutes.Properties },
  ];
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const history = useHistory();

  const handleSelectedTab = (tab: NavigationTab, index: number) => {
    setSelectedTab(index);
    history.push(tab.to);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <div
        onClick={() => handleSelectedTab(tab, index)}
        className={`app-navigation__tab app-navigation__tab${
          selectedTab === index ? "--selected" : ""
        }`}>
        {tab.label}
      </div>
    ));
  };

  const renderIntro = (): JSX.Element => (
    <div className='app-intro'>
      <h3>Global Distributed Software Development</h3>
      <h3>Summer 2021</h3>
      <h3>Team 1</h3>
      <h3>Milestone 3</h3>
    </div>
  );

  const renderTabsWrapper = (): JSX.Element => {
    return (
      <div className='tabs-wrapper'>
        <div className='app-logo'>
          <img src={AppLogo} />
        </div>
        {renderTabs()}
      </div>
    );
  };

  return (
    <div className='app-navigation'>
      {renderIntro()}
      {renderTabsWrapper()}
    </div>
  );
};
export default Navigation;
