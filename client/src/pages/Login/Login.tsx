import "./Login.scss";

import React, { FC, useState } from "react";

import logo from "../../assets/images/logo.png";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppRoutes } from "../../containers/Router/routes";
import { loginUser, UserRoles } from "../../api/user";
import { setAppUser } from "../../store/user/actions";

const LoginPage: React.FC<PropsFromRedux> = ({ dispatch }) => {
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<{
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
    if (error) {
      setError("");
    }
    try {
      const authenticatedUser = await loginUser(
        user.username,
        user.password,
        user.role
      );
      dispatch(setAppUser(authenticatedUser as any));
      localStorage.setItem("auth-user", JSON.stringify(authenticatedUser));
      history.push(AppRoutes.Landing);
    } catch (e) {
      setError("Incorrect username/password/role");
    }
  };

  const renderUserRoles = () => {
    return (
      <div className='user-roles-wrapper'>
        {Object.keys(UserRoles).map((role) => (
          <div
            onClick={() => {
              setUser({ ...user, role: role });
            }}
            key={`user-roles-${role}`}
            className={`user-roles-wrapper__role action-item ${
              user.role.toLowerCase() === role.toLowerCase()
                ? "user-roles-wrapper__role__selected"
                : ""
            }`}>
            {role}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='app-page login-page'>
      <div className='page__content'>
        <img src={logo} alt='' />
        <p className='tag-line'>Home for me!</p>
        {renderUserRoles()}
        {error.trim() && <p style={{ color: "red" }}>{error}</p>}
        <div className='login-page__form'>
          <form className='form-group'>
            <label htmlFor='username'></label>
            <input
              className='form-control'
              id='username'
              type='text'
              placeholder='Username'
              value={user.username}
              onChange={(e) =>
                setUser({
                  ...user,
                  username: e.target.value,
                })
              }
            />
            <label htmlFor='password'></label>
            <input
              className='form-control'
              id='password'
              type='password'
              placeholder='Password'
              value={user.password}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
            />
            <button
              className='btn btn-success login-cta'
              disabled={
                !user.username || !user.password || user?.password?.length < 4
              }
              onClick={loginHandler}>
              Log In
            </button>
          </form>
          <p className='or-separator'>OR</p>
          <button
            className='btn btn-primary'
            onClick={() => history.push(AppRoutes.SignUp)}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

const connector = connect();
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(LoginPage);
