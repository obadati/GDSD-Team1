import "./Login.scss";

import React, { FC, useState } from "react";

import logo from "../../assets/images/logo.png";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppRoutes } from "../../containers/Router/routes";
import { loginUser, UserRoles } from "../../api/user";

const LoginPage: React.FC<any> = ({ dispatch }) => {
    const [user, setAppUser] = useState<{
        username: string;
        password: string;
        role: UserRoles | string;
    }>({
        username: "",
        password: "",
        role: UserRoles.Buyer,
    });
    const history = useHistory();

    const loginHandler = async (event: any) => {
        event.preventDefault();
        const authenticatedUser = await loginUser(
            user.username,
            user.password,
            user.role
        );
        localStorage.setItem("auth-user", JSON.stringify(authenticatedUser));
        history.push(AppRoutes.Landing);
    };

    const renderUserRoles = () => {
        return (
            <div className="user-roles-wrapper">
                {Object.keys(UserRoles).map((role) => (
                    <div
                        onClick={() => {
                            setAppUser({ ...user, role: role });
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
        <div className="app-page login-page">
            <div className="page__content">
                <img src={logo} alt="" />
                <p className="tag-line">Home for me!</p>
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
                                setAppUser({
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
                                setAppUser({
                                    ...user,
                                    password: e.target.value,
                                })
                            }
                        />
                        <button
                            className="btn btn-success login-cta"
                            disabled={
                                !user.username ||
                                !user.password ||
                                user?.password?.length < 4
                            }
                            onClick={loginHandler}
                        >
                            Log In
                        </button>
                    </form>
                    <p className="or-separator">OR</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => history.push(AppRoutes.SignUp)}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

const connector = connect();
export default connector(LoginPage);
