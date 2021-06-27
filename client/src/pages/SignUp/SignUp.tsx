import React, { useState } from "react";
import "./SignUp.scss";
import logo from "../../assets/images/logo.png";
import { UserRoles } from "../../api/user";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../store/rootReducer";
import { Company } from "../../store/companies/types";

const SignUpPage: React.FC<PropsFromRedux> = ({ dispatch, companies }) => {
    const [user, setUser] = useState<{
        username: string;
        password: string;
        role: UserRoles | string;
        company?: Company;
    }>({
        username: "",
        password: "",
        role: UserRoles.Buyer,
    });

    const handleSignUp = () => {
        console.log({ signupUser: user });
    };

    const renderUserRoles = () => {
        return (
            <div className="user-roles-wrapper">
                {Object.keys(UserRoles)
                    .filter((item) => item.toLowerCase() !== "admin")
                    .map((role) => (
                        <div
                            onClick={() => {
                                setUser({ ...user, role: role });
                            }}
                            key={`user-roles-${role}`}
                            className={`user-roles-wrapper__role action-item ${
                                user.role.toLowerCase() === role.toLowerCase()
                                    ? "user-roles-wrapper__role__selected"
                                    : ""
                            }`}
                        >
                            {role}
                        </div>
                    ))}
            </div>
        );
    };

    return (
        <div className="app-page sign-up-page">
            <div className="page__content">
                <img src={logo} alt="" />
                <p className="tag-line">Join us now!</p>
                {renderUserRoles()}
                <div className="login-page__form">
                    <form className="form-group">
                        <label htmlFor="username"></label>
                        <input
                            className="form-control"
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={user.username}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    username: e.target.value,
                                })
                            }
                        />
                        <label htmlFor="password"></label>
                        <input
                            className="form-control"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password: e.target.value,
                                })
                            }
                        />
                        {user.role.toLowerCase() === UserRoles.Agent && (
                            <div className="company-selection">
                                <label>Company</label>
                                <div className="dropdown"></div>
                                <button
                                    style={{ width: "100%" }}
                                    className="btn btn-info dropdown-toggle app-button"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {user.company?.name || "Select Company"}
                                </button>
                                <div
                                    style={{ width: "100%" }}
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    {companies?.map((company: Company) => (
                                        <a
                                            className="dropdown-item"
                                            onClick={() => {
                                                setUser({
                                                    ...user,
                                                    company: company,
                                                });
                                            }}
                                        >
                                            {company.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </form>
                    <button
                        className="btn btn-primary sign-up-cta"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    companies: state.companies.companies,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(SignUpPage);
