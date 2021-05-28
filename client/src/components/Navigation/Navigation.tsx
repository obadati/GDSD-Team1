import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AppLogo from "../../assets/images/logo.png";
import { AppRoutes } from "../../containers/Router/routes";
import { setActiveTab } from "../../store/navigation/actions";
import { NavigationTab } from "../../store/navigation/types";
import { AppState } from "../../store/rootReducer";
import "./Navigation.scss";

const Navigation: React.FC<PropsFromRedux> = ({ activeTab, dispatch }) => {
  const tabs: NavigationTab[] = [
    { label: "home", to: AppRoutes.Landing },
    { label: "about", to: AppRoutes.About },
    { label: "find property", to: AppRoutes.Properties },
  ];
  const history = useHistory();

  const handleSelectedTab = (tab: NavigationTab, index: number) => {
    dispatch(setActiveTab(tab));
    history.push(tab.to);
  };

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <div
        key={`navigation-tab-${index}`}
        onClick={() => handleSelectedTab(tab, index)}
        className={`app-navigation__tab app-navigation__tab${
          activeTab.label === tab.label ? "--selected" : ""
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

const mapStateToProps = (state: AppState) => ({
  activeTab: state.navigation.activeTab,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Navigation);
