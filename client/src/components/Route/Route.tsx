import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppRoutes } from "../../containers/Router/routes";
import { useAuth } from "../../hooks/auth";

interface MetaRoute {
  path: AppRoutes | any;
  exact?: boolean;
  component: React.ComponentType<any>;
}

// HOC
export const PrivateRoute: FC<MetaRoute> = ({
  component: Component,
  ...rest
}) => {
  const { authenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={AppRoutes.Login} />
        )
      }
    />
  );
};

export const GuestRoute: FC<MetaRoute> = ({
  component: Component,
  ...rest
}) => {
  const { authenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={AppRoutes.Landing}></Redirect>
        )
      }
    />
  );
};
