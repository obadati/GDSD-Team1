import React from "react";
import { Route, Switch } from "react-router-dom";
import { GuestRoute, PrivateRoute } from "../../components/Route/Route";
import { HomePage, LandingPage, PropertiesPage } from "../../pages";
import Login from "../../pages/Login/Login";
import AboutUsPage from "../../pages/AboutUs/AboutUs";
import ContactUs from "../../pages/AboutUs/component/Contact";
import PropertyDetail from "../../pages/PropertyDetail/PropertyDetail";
import { AppRoutes } from "./routes";

const AppRouter: React.FC<any> = () => {
  return (
    <Switch>
      <GuestRoute path={AppRoutes.Login} component={Login}></GuestRoute>
      <Route path={AppRoutes.Landing} exact component={HomePage}></Route>
      <Route path={AppRoutes.Contact} exact component={ContactUs}></Route>
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
