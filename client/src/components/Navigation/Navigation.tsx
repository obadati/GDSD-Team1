import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import AppLogo from "../../assets/images/logo.png";
import { AppRoutes } from "../../containers/Router/routes";
import { useAuth } from "../../hooks/auth";
import { setActiveTab } from "../../store/navigation/actions";
import { NavigationTab, UserActions } from "../../store/navigation/types";
import { AppState } from "../../store/rootReducer";

import "./Navigation.scss";

const Navigation: React.FC<PropsFromRedux> = ({ activeTab, dispatch }) => {
    const { authenticated, username } = useAuth();
    const tabs: NavigationTab[] = [
        { label: "home", to: AppRoutes.Landing },
        { label: "properties", to: AppRoutes.Properties },
        { label: "average price", to: AppRoutes.AvgPrice },
        { label: "Dashboard", to: AppRoutes.Dashboard },
        { label: "companies", to: AppRoutes.Companies },
        { label: "chat", to: AppRoutes.Messenger },
        { label: "about us", to: AppRoutes.AboutUs },
    ];

    const userActions: UserActions[] = [];
    if (username) {
        userActions.push({ label: username });
    }
    if (authenticated) {
        userActions.push({ label: "Log Out", to: AppRoutes.Login });
    } else {
        userActions.push({ label: "Log In", to: AppRoutes.Login });
    }

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
                }`}
            >
                {tab.label}
            </div>
        ));
    };

    const handleUserAction = (label: string) => {
        if (label === "Log Out") {
            localStorage.clear();
        }
        if (label !== username) history.push(AppRoutes.Login);
    };

    const renderUserActions = () =>
        userActions.map((tab, index) => (
            <div
                key={`navigation-tab-${index}`}
                onClick={() => handleUserAction(tab.label)}
                className={`app-navigation__tab app-navigation__tab${
                    activeTab.label === tab.label ? "--selected" : ""
                } ${
                    tab.label === username
                        ? `app-navigation__tab--username`
                        : ""
                }`}
            >
                {tab.label}
            </div>
        ));

    const renderIntro = (): JSX.Element => (
        <div className="app-intro">
            <h3>Global Distributed Software Development</h3>
            <h3>Summer 2021</h3>
            <h3>Team 1</h3>
            <h3>Milestone 3</h3>
        </div>
    );

    const renderTabsWrapper = (): JSX.Element => {
        return (
            <div className="tabs-wrapper">
                <div className="app-logo">
                    <img src={AppLogo} />
                </div>
                {renderTabs()}
                <div className="user-actions">{renderUserActions()}</div>
            </div>
        );
    };

    return (
        <div className="app-navigation">
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
