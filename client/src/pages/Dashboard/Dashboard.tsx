import React, { useEffect } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { AppRoutes } from "../../containers/Router/routes";
import { useAuth } from "../../hooks/auth";
import "./Dashboard.scss";
import { NavigationTab } from "../../store/navigation/types";
import { useState } from "react";
import x from "../../assets/images/hero-fallback-2.jpg";

const Dashboard: React.FC<any> = () => {
    const { username } = useAuth();
    const [selectedTab, setSelectedTab] = useState<number>(-1);
    const tabs: NavigationTab[] = [
        {
            label: "Properties",
            to: `${AppRoutes.Properties}`,
        },
        {
            label: "Messages",
            to: `${AppRoutes.Messenger}`,
        },
        {
            label: "Companies",
            to: `${AppRoutes.Companies}`,
        },
        {
            label: "Contracts",
            to: `${AppRoutes.Contracts}`,
        },
        {
            label: "Approvals",
            to: `${AppRoutes.Approvals}`,
        },
    ];
    return (
        <div className="app-page user-dashboard ">
            <div className="user-dashboard__tiles">
                {tabs.map((tab) => (
                    <Link to={tab.to}>
                        <div className="user-dashboard__tiles__tile">
                            <p>{tab.label}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
