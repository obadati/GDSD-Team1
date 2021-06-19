import React from "react";
import { Route, Switch } from "react-router-dom";
import { GuestRoute, PrivateRoute } from "../../components/Route/Route";
import { HomePage, LandingPage, PropertiesPage, MessengerPage } from "../../pages";
import AvgPriceCalculator from "../../pages/AvgPriceCalculator/AvgPriceCalculator";
import Login from "../../pages/Login/Login";
import AboutUsPage from "../../pages/AboutUs/AboutUs";
import ContactUs from "../../pages/AboutUs/component/Contact";
import PropertyDetail from "../../pages/PropertyDetail/PropertyDetail";
import { AppRoutes } from "./routes";
import NotFound from "../../pages/NotFound/NotFound";
import Dashboard from "../../pages/Dashboard/Dashboard";
import AgentProperties from "../../pages/AgentProperties/AgentProperties";

const AppRouter: React.FC<any> = () => {
  return (
    <Switch>
      <GuestRoute path={AppRoutes.Login} component={Login}></GuestRoute>
      <Route path={AppRoutes.Landing} exact component={HomePage}></Route>
      <Route path={AppRoutes.Messenger} exact component={MessengerPage}></Route>
      <Route path={AppRoutes.Contact} exact component={ContactUs}></Route>
      <Route path={AppRoutes.AboutUs} exact component={AboutUsPage}></Route>
      <PrivateRoute
        exact
        path={AppRoutes.Dashboard}
        component={Dashboard}></PrivateRoute>
      <PrivateRoute
        exact
        path={`${AppRoutes.Dashboard}/${AppRoutes.Contact}`}
        component={Dashboard}></PrivateRoute>
      <PrivateRoute
        exact
        path={`${AppRoutes.Dashboard}${AppRoutes.Properties}`}
        component={AgentProperties}></PrivateRoute>
      <PrivateRoute
        exact
        path={AppRoutes.Dashboard}
        component={Dashboard}></PrivateRoute>
      <PrivateRoute
        path={AppRoutes.Properties}
        component={PropertiesPage}
        exact></PrivateRoute>
      <PrivateRoute
        path={AppRoutes.PropertyDetail}
        component={PropertyDetail}
        exact></PrivateRoute>
      <PrivateRoute
        path={AppRoutes.AvgPrice}
        component={AvgPriceCalculator}
        exact></PrivateRoute>
      <Route path='*' component={NotFound}></Route>
    </Switch>
  );
};

export default AppRouter;
