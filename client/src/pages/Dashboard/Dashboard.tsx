import React, { useEffect } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { AppRoutes } from "../../containers/Router/routes";
import { useAuth } from "../../hooks/auth";
import "./Dashboard.scss";
import { NavigationTab } from "../../store/navigation/types";
import { useState } from "react";
import AgentProperties from "../AgentProperties/AgentProperties";

const Dashboard: React.FC<any> = () => {
  const { username } = useAuth();
  const [selectedTab, setSelectedTab] = useState<number>(-1);
  const dashboardTabs: NavigationTab[] = [
    {
      label: "Properties",
      to: `${AppRoutes.Properties}`,
    },
  ];
  return (
    <div className='app-page user-dashboard '>
      <div className='user-dashboard__aside'>
        {dashboardTabs.map((tab, index) => (
          <a
            className={`${index === selectedTab} ? 'selected': ""`}
            onClick={() => setSelectedTab(index)}>
            {tab.label}
          </a>
        ))}
      </div>
      <div className='user-dashboard__center'>
        {selectedTab === -1 && (
          <p>
            Welcome <span className='username'> {username}</span>
          </p>
        )}
        {selectedTab === 0 && <AgentProperties></AgentProperties>}
      </div>
    </div>
  );
};

export default Dashboard;
