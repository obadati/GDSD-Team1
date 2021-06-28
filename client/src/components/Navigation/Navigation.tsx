import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import AppLogo from "../../assets/images/logo.png";
import { AppRoutes } from "../../containers/Router/routes";
import { useAuth } from "../../hooks/auth";
import axios from "axios";
import { setActiveTab } from "../../store/navigation/actions";
import { NavigationTab, UserActions } from "../../store/navigation/types";
import { AppState } from "../../store/rootReducer";
import { BASE_URL } from "../../api/properties";

import "./Navigation.scss";

const Navigation: React.FC<PropsFromRedux> = ({ activeTab, dispatch }) => {
    const { id, authenticated, username } = useAuth();
    const [newMessages, setNewMessages] = useState([] as any);
    const tabs: NavigationTab[] = [
        { label: "home", to: AppRoutes.Landing },
        { label: "properties", to: AppRoutes.Properties },
        { label: "average price", to: AppRoutes.AvgPrice },
        { label: "Dashboard", to: AppRoutes.Dashboard },
        { label: "companies", to: AppRoutes.Companies },
        { label: "chat", to: AppRoutes.Messenger },
        { label: "about us", to: AppRoutes.AboutUs },
    ];

    useEffect(() => {
        const getNewMassages = async () => {
            try {
                const res = await axios.get(
                    BASE_URL + "/api/message/getNewMessages/" + id);
                setNewMessages(res as any);
            } catch (err) {
                console.log(err);
            }
        };
        getNewMassages();
    }, []);

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

    const renderTabs = () => {
        return tabs.map((tab, index) => (
            <NavLink
                exact
                to={tab.to}
                activeClassName="app-navigation__tab--selected"
                key={`navigation-tab-${index}`}
                className={`app-navigation__tab `}
            >
                {tab.label}
            </NavLink>
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
                className={`app-navigation__tab app-navigation__tab${activeTab.label === tab.label ? "--selected" : ""
                    } ${tab.label === username
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
                <div className="user-actions">
                    {username ? (
                        <>
                            <div className="topbarIconItem" onClick={() => history.push(AppRoutes.Messenger)}>
                                <Chat />
                                <span className="topbarIconBadge"> {newMessages.map((m: any) => (m.unread))}</span>
                            </div>   </>) : (<p></p>)
                    }
                    {renderUserActions()}</div>
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
