import React, { useState } from "react";
import "./SignUp.scss";
import logo from "../../assets/images/logo.png";
import { signUpUser, UserRoles } from "../../api/user";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../store/rootReducer";
import { Company } from "../../store/companies/types";
import { setLoadingState } from "../../store/loader/actions";
import { setAppUser } from "../../store/user/actions";
import { useHistory } from "react-router";
import { AppRoutes } from "../../containers/Router/routes";

const SignUpPage: React.FC<PropsFromRedux> = ({ dispatch, companies }) => {
  const history = useHistory();
  const [user, setUser] = useState<{
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRoles | string;
    company?: Company;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: UserRoles.Buyer,
  });

  const handleSignUp = async () => {
    try {
      dispatch(setLoadingState(true));
      await signUpUser(
        user.email,
        user.password,
        user.role,
        user.firstName,
        user.lastName,
        user.company?.id
      );
      history.push(AppRoutes.Login);
      dispatch(setLoadingState(false));
    } catch (e) {
      dispatch(setLoadingState(false));
    }
  };

  const renderUserRoles = () => {
    return (
      <div className='user-roles-wrapper'>
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
              }`}>
              {role}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className='app-page sign-up-page'>
      <div className='page__content'>
        <img src={logo} alt='' />
        <p className='tag-line'>Join us now!</p>
        {renderUserRoles()}
        <div className='sign-up-page__form'>
          <form className='form-group'>
            <input
              className='form-control'
              id='firstName'
              type='text'
              placeholder='First Name'
              value={user.firstName}
              onChange={(e) =>
                setUser({
                  ...user,
                  firstName: e.target.value,
                })
              }
            />
            <input
              className='form-control'
              id='lastName'
              type='text'
              placeholder='Last Name'
              value={user.lastName}
              onChange={(e) =>
                setUser({
                  ...user,
                  lastName: e.target.value,
                })
              }
            />
            <input
              className='form-control'
              id='email'
              type='text'
              placeholder='email'
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
            />
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
            {user.role.toLowerCase() === UserRoles.Agent && (
              <div className='company-selection'>
                <label>Company</label>
                <div className='dropdown'></div>
                <button
                  style={{ width: "100%" }}
                  className='btn btn-info dropdown-toggle app-button'
                  type='button'
                  id='dropdownMenuButton'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'>
                  {user.company?.name || "Select Company"}
                </button>
                <div
                  style={{ width: "100%" }}
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton'>
                  {companies?.map((company: Company) => (
                    <a
                      className='dropdown-item'
                      onClick={() => {
                        setUser({
                          ...user,
                          company: company,
                        });
                      }}>
                      {company.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </form>
          <button
            className='btn btn-primary sign-up-cta'
            onClick={handleSignUp}>
            Sign Up
          </button>
          <p className='or-separator'>OR</p>
          <button
            className='btn btn-success'
            onClick={() => history.push(AppRoutes.Login)}>
            Login
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
