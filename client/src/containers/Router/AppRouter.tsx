import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage, LandingPage, PropertiesPage,AboutPage,Mydashboardpage,Companiespage,Findaveragepricepage} from "../../pages";
import { AppRoutes } from "./routes";

const AppRouter: React.FC<any> = () => {
  return (
    <Switch>
      <Route path={AppRoutes.Landing} exact component={HomePage}></Route>
      <Route path={AppRoutes.About} exact component={LandingPage}></Route>
      <Route path={AppRoutes.Properties} exact component={PropertiesPage}></Route>
      <Route path={AppRoutes.Home} exact component={PropertiesPage}></Route>
      <Route path={AppRoutes.MyDashboard} exact component={PropertiesPage}></Route>
      <Route path={AppRoutes.FindAveragePrice} exact component={PropertiesPage}></Route>
    </Switch>
  );
};

export default AppRouter;
