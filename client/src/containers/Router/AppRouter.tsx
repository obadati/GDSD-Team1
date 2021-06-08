import React from "react";
import { Route, Switch } from "react-router-dom";
import { GuestRoute, PrivateRoute } from "../../components/Route/Route";
import { HomePage, LandingPage, PropertiesPage } from "../../pages";
import Login from "../../pages/Login/Login";
import PropertyDetail from "../../pages/PropertyDetail/PropertyDetail";
import { AppRoutes } from "./routes";

const AppRouter: React.FC<any> = () => {
  return (
    <Switch>
      <GuestRoute path={AppRoutes.Login} component={Login}></GuestRoute>
      <GuestRoute
        path={AppRoutes.Landing}
        exact
        component={HomePage}></GuestRoute>
      <GuestRoute
        path={AppRoutes.About}
        exact
        component={LandingPage}></GuestRoute>
      <PrivateRoute
        path={AppRoutes.Properties}
        component={PropertiesPage}
        exact></PrivateRoute>
      <PrivateRoute
        path={AppRoutes.PropertyDetail}
        component={PropertyDetail}
        exact></PrivateRoute>
    </Switch>
  );
};

export default AppRouter;
