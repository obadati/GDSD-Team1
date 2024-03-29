import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import AppLogo from "../../assets/images/logo.png";
import { AppRoutes } from "../../containers/Router/routes";
import axios from "axios";
import { NavigationTab, UserActions } from "../../store/navigation/types";
import { AppState } from "../../store/rootReducer";
import {
  BASE_URL,
  NavigationTabData,
  API_MSG_URL,
  LOG_OUT,
} from "../../constants/constants";
import msgIcon from "../../assets/images/messenger.png";

import "./Navigation.scss";
import { setAppUser } from "../../store/user/actions";
import { dummyUser } from "../../store/user/reducer";

const Navigation: React.FC<PropsFromRedux> = ({
  activeTab,
  dispatch,
  user,
}) => {
  const { id, token, username } = user;
  const [newMessages, setNewMessages] = useState<any[]>([]);

  const tabs: NavigationTab[] = NavigationTabData;
  const [userActions, setUserActions] = useState<UserActions[]>([]);
  useEffect(() => {
    const getNewMassages = async () => {
      try {
        const res = await axios.get(BASE_URL + API_MSG_URL + id);
        setNewMessages(res as any);
      } catch (err) {
        console.log(err);
      }
    };
    getNewMassages();
  }, [id]);

  useEffect(() => {
    setUserActions([]);
    if (token) {
      setUserActions([
        { label: username },
        { label: "Log Out", to: AppRoutes.Login },
      ]);
    } else {
      setUserActions([{ label: "Log In", to: AppRoutes.Login }]);
      userActions.push();
    }
  }, [username]);

  const history = useHistory();

  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <NavLink
        exact
        to={tab.to}
        activeClassName='app-navigation__tab--selected'
        key={`navigation-tab-${index}`}
        className={`app-navigation__tab `}>
        {tab.label}
      </NavLink>
    ));
  };

  const handleUserAction = (label: string) => {
    if (label === LOG_OUT) {
      localStorage.clear();
      dispatch(setAppUser(dummyUser));
      history.push(AppRoutes.Landing);
    } else {
      if (label !== username) history.push(AppRoutes.Login);
    }
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
            : tab.label.toLowerCase() === "log out"
            ? `app-navigation__tab--logout`
            : ""
        }`}>
        {tab.label}
      </div>
    ));

  const renderIntro = (): JSX.Element => (
    <div className='app-intro'>
      <h3>Fulda University Software Engineering</h3>
      <h3>Summer 2021</h3>
      <h3>For Demonstration Only</h3>
    </div>
  );

  const renderTabsWrapper = (): JSX.Element => {
    return (
      <div className='tabs-wrapper'>
        <div className='app-logo'>
          <img src={AppLogo} />
        </div>
        {renderTabs()}
        <div className='user-actions'>
          {username ? (
            <>
              <div
                className='chat-bubble-icon'
                onClick={() => history.push(AppRoutes.Messenger)}>
                <img
                  style={{ height: "20px", width: "20px" }}
                  src={msgIcon}
                  alt=''
                />
                <span className='chat-icon-badge-count'>
                  {newMessages.map((m: any) => m.unread)}
                </span>
              </div>
            </>
          ) : (
            <p></p>
          )}
          {renderUserActions()}
        </div>
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
  user: state.user,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Navigation);
