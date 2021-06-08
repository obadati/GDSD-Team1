import React from "react";
import { Route, Switch } from "react-router-dom";
import { GuestRoute, PrivateRoute } from "../../components/Route/Route";
import { HomePage, LandingPage, PropertiesPage } from "../../pages";
import Login from "../../pages/Login/Login";
        
import AboutUsPage from "../../pages/AboutUs/AboutUs";
import ContactUs from "../../pages/AboutUs/component/Contact";
import Mission from "../../pages/AboutUs/component/Mission";
import Location from "../../pages/AboutUs/component/Location"

import PropertyDetail from "../../pages/PropertyDetail/PropertyDetail";
import { AppRoutes } from "./routes";
import Team from "../../pages/AboutUs/component/Team";
import GeneralInfo from "../../pages/AboutUs/component/GeneralInfo";

const AppRouter: React.FC<any> = () => {
  return (
    <Switch>
      <GuestRoute path={AppRoutes.Login} component={Login}></GuestRoute>
      <Route path={AppRoutes.Landing} exact component={HomePage}></Route>
      <Route path={AppRoutes.About} exact component={LandingPage}></Route>

      <Route path={AppRoutes.Contact} exact component={ContactUs}></Route>
      <Route path={AppRoutes.Mission} exact component={Mission}></Route>
       <Route path={AppRoutes.Location} exact component={Location}></Route> 
      <Route path={AppRoutes.TheTeam} exact component={Team}></Route>
      <Route path={AppRoutes.GeneralInfo} exact component={GeneralInfo}></Route>
      <Route path={AppRoutes.AboutUs} exact component={AboutUsPage}></Route>

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
