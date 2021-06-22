import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../containers/Router/routes";
import { useAuth } from "../../hooks/auth";
import "./Dashboard.scss";
import { NavigationTab } from "../../store/navigation/types";
import { useState } from "react";
import x from "../../assets/images/hero-fallback-2.jpg";
import { UserRoles } from "../../api/user";
import contractIcon from "../../assets/images/contract.png";
import homeIcon from "../../assets/images/home.png";
import msgIcon from "../../assets/images/msg.png";
import companyIcon from "../../assets/images/company.png";
import approvalIcon from "../../assets/images/approval.png";

interface DashboardTile extends NavigationTab {
    icon: string;
}

const Dashboard: React.FC<any> = () => {
    const { username, role } = useAuth();
    const [selectedTab, setSelectedTab] = useState<number>(-1);
    const tabs: DashboardTile[] = [
        {
            label: "Messages",
            to: `${AppRoutes.Messenger}`,
            icon: msgIcon,
        },
        {
            label: "Companies",
            to: `${AppRoutes.Companies}`,
            icon: companyIcon,
        },
        {
            label: "Contracts",
            to: `${AppRoutes.Contracts}`,
            icon: contractIcon,
        },
        {
            label: "Approvals",
            to: `${AppRoutes.Approvals}`,
            icon: approvalIcon,
        },
    ];

    if (role !== UserRoles.Buyer) {
        tabs.push({
            label: "Properties",
            to: `${AppRoutes.Properties}`,
            icon: homeIcon,
        });
    }

    return (
        <div className="app-page user-dashboard ">
            <div className="user-dashboard__tiles">
                {tabs.map((tab) => (
                    <Link to={tab.to}>
                        <div className="user-dashboard__tiles__tile">
                            <div className="tile-content-wrapper">
                                <img src={tab.icon} alt="" />
                                <p>{tab.label}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
