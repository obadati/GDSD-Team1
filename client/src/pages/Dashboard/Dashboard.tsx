import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../containers/Router/routes";
import { useAuth } from "../../hooks/auth";
import "./Dashboard.scss";
import { NavigationTab } from "../../store/navigation/types";
import { useState } from "react";
import x from "../../assets/images/hero-fallback-2.jpg";
import { UserRoles } from "../../api/user";

const Dashboard: React.FC<any> = () => {
    const { username, role } = useAuth();
    const [selectedTab, setSelectedTab] = useState<number>(-1);
    const tabs: NavigationTab[] = [
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

    if (role !== UserRoles.Buyer) {
        tabs.push({
            label: "Properties",
            to: `${AppRoutes.Properties}`,
        });
    }

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
