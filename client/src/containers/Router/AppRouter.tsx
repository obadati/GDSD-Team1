import React from "react";
import { Route, Switch } from "react-router-dom";
import { GuestRoute, PrivateRoute } from "../../components/Route/Route";
import { HomePage, LandingPage, PropertiesPage, MessengerPage } from "../../pages";
import Login from "../../pages/Login/Login";
import PropertyDetail from "../../pages/PropertyDetail/PropertyDetail";
import { AppRoutes } from "./routes";

const AppRouter: React.FC<any> = () => {
  return (
    <Switch>
      <GuestRoute path={AppRoutes.Login} component={Login}></GuestRoute>
      <Route path={AppRoutes.Landing} exact component={HomePage}></Route>
      <Route path={AppRoutes.Messenger} exact component={MessengerPage}></Route>
      <Route path={AppRoutes.About} exact component={LandingPage}></Route>
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
