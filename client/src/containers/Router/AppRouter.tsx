import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage, LandingPage, PropertiesPage } from "../../pages";
import { AppRoutes } from "./routes";

const AppRouter: React.FC<any> = () => {
  return (
    <Switch>
      <Route path={AppRoutes.Landing} exact component={HomePage}></Route>
      <Route path={AppRoutes.About} exact component={LandingPage}></Route>
      <Route
        path={AppRoutes.Properties}
        component={PropertiesPage}
        exact></Route>
    </Switch>
  );
};

export default AppRouter;
