import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LandingPage, AboutPage } from "../../pages";
import { AppRoutes } from "./routes";

const AppRouter: React.FC<any> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoutes.Landing} exact component={LandingPage}></Route>
        <Route path={AppRoutes.About} exact component={AboutPage}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
