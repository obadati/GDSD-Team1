import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../containers/Router/routes";
import { useAuth } from "../../hooks/auth";
import "./Dashboard.scss";
import { NavigationTab } from "../../store/navigation/types";
import contractIcon from "../../assets/images/contract.png";
import homeIcon from "../../assets/images/home.png";
import msgIcon from "../../assets/images/msg.png";
import companyIcon from "../../assets/images/company.png";
import approvalIcon from "../../assets/images/approval.png";
import queryIcon from "../../assets/images/query.png";
import { UserRoles } from "../../api/user";
import { useState } from "react";
import reportsIcon from "../../assets/images/approval.png";

interface DashboardTile extends NavigationTab {
    icon: string;
    role?: UserRoles;
}

const tabs: DashboardTile[] = [
    {
        label: "Messages",
        to: `${AppRoutes.Messenger}`,
        icon: msgIcon,
    },
    {
        label: "Approvals",
        to: `${AppRoutes.Approvals}`,
        icon: approvalIcon,
        role: UserRoles.Admin,
    },
    {
        label: "Contracts",
        to: `${AppRoutes.Contracts}`,
        icon: contractIcon,
    },
    {
        label: "Queries",
        to: `${AppRoutes.Queries}`,
        icon: queryIcon,
        role: UserRoles.Admin,
    },
    {
        label: "Companies",
        to: `${AppRoutes.Companies}`,
        icon: companyIcon,
        role: UserRoles.Admin,
    },
    {
        label: "Properties",
        to: `${AppRoutes.Properties}`,
        icon: homeIcon,
        role: UserRoles.Agent,
    },
];

const Dashboard: React.FC<any> = () => {
    const { role } = useAuth();
    const [dashboardTiles, setDashboardTiles] = useState<DashboardTile[]>(tabs);

    useEffect(() => {
        if (role) {
            setDashboardTiles([
                ...dashboardTiles.filter(
                    (tile) => tile.role === role || !tile.role
                ),
            ]);
        }
    }, [role]);

    return (
        <div className="app-page user-dashboard ">
            <div className="user-dashboard__tiles">
                {dashboardTiles.map((tab) => (
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
