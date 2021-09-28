import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router";
import { GuestRoute, PrivateRoute } from "../../components/Route/Route";
import {
  HomePage,
  PropertiesPage,
  MessengerPage,
  AboutDeveloperPage,
} from "../../pages";
import AvgPriceCalculator from "../../pages/AvgPriceCalculator/AvgPriceCalculator";
import Login from "../../pages/Login/Login";
import AboutUsPage from "../../pages/AboutUs/AboutUs";
import ContactUs from "../../pages/AboutUs/component/Contact";
import PropertyDetail from "../../pages/PropertyDetail/PropertyDetail";
import { AppRoutes } from "./routes";
import NotFound from "../../pages/NotFound/NotFound";
import Dashboard from "../../pages/Dashboard/Dashboard";
import EditProperty from "../../pages/EditProperty/EditProperty";
import Approval from "../../pages/ApprovalManagement/ApprovalDashboard/Approval";
import AgentApproval from "../../pages/ApprovalManagement/AgentApporval/AgentApproval";
import PropertyApproval from "../../pages/ApprovalManagement/PropertyApproval/PropertyApproval";
import ViewCompanies from "../../pages/Companies/ViewCompany";
import AddCompanies from "../../pages/Companies/AddComapnies";
import Companies from "../../pages/Companies/Companies";
import PropertyList from "../../pages/Companies/PropertyList";
import AgentList from "../../pages/Companies/AgentList";
import SignUpPage from "../../pages/SignUp/SignUp";
import Reports from "../../pages/Reports/Reports";
import Queries from "../../pages/Queries/Queries";
import ContractsPage from "../../pages/Contracts/Contracts";
import CreateContract from "../../pages/CreateContract/CreateContract";
import CreateProperty from "../../pages/CreateProperty/CreateProperty";
const AppRouter: React.FC<any> = () => {
  const history = useHistory();
  useEffect(() => redirectToHomeOnReload(), []);

  const redirectToHomeOnReload = () => {
    const currentRoute = window.location.href.split(window.location.origin)[1];
    if (currentRoute !== AppRoutes.Landing) {
      history.push(AppRoutes.Landing);
    }
  };

  return (
    <Switch>
      <GuestRoute path={AppRoutes.Login} component={Login}></GuestRoute>
      <GuestRoute
        exact
        path={AppRoutes.SignUp}
        component={SignUpPage}></GuestRoute>
      <Route path={AppRoutes.Landing} exact component={HomePage}></Route>
      <Route path={AppRoutes.Messenger} exact component={MessengerPage}></Route>
      <Route path={AppRoutes.Contact} exact component={ContactUs}></Route>
      <Route path={AppRoutes.AboutUs} exact component={AboutUsPage}></Route>
      <Route
        path={AppRoutes.AboutDeveloper}
        exact
        component={AboutDeveloperPage}></Route>
      <Route path={AppRoutes.Companies} exact component={Companies}></Route>
      <Route path={AppRoutes.AgentList} exact component={AgentList}></Route>
      <Route
        path={AppRoutes.PropertyList}
        exact
        component={PropertyList}></Route>
      <PrivateRoute
        exact
        path={AppRoutes.Dashboard}
        component={Dashboard}></PrivateRoute>
      <PrivateRoute
        exact
        path={`${AppRoutes.Contracts}`}
        component={ContractsPage}></PrivateRoute>
      <PrivateRoute
        exact
        path={AppRoutes.Dashboard}
        component={Dashboard}></PrivateRoute>
      <Route
        path={AppRoutes.Properties}
        component={PropertiesPage}
        exact></Route>
      <Route
        path={AppRoutes.PropertyDetail}
        component={PropertyDetail}
        exact></Route>
      <PrivateRoute
        path={AppRoutes.EditProperty}
        component={EditProperty}
        exact></PrivateRoute>
      <PrivateRoute
        path={AppRoutes.AvgPrice}
        component={AvgPriceCalculator}
        exact></PrivateRoute>
      <PrivateRoute
        path={AppRoutes.Approvals}
        component={Approval}
        exact></PrivateRoute>
      <PrivateRoute
        path={AppRoutes.AgentApprovals}
        component={AgentApproval}
        exact></PrivateRoute>
      <PrivateRoute
        path={AppRoutes.PropertyApprovals}
        component={PropertyApproval}
        exact></PrivateRoute>
      <PrivateRoute
        path={AppRoutes.Reports}
        component={Reports}
        exact></PrivateRoute>
      <PrivateRoute
        path={AppRoutes.Queries}
        component={Queries}
        exact></PrivateRoute>
      <PrivateRoute
        path={AppRoutes.ViewCompanies}
        component={ViewCompanies}
        exact></PrivateRoute>
      <PrivateRoute
        path={AppRoutes.AddCompanies}
        component={AddCompanies}
        exact></PrivateRoute>
      <PrivateRoute
        path={AppRoutes.CreateContracts}
        component={CreateContract}
        exact></PrivateRoute>
      <PrivateRoute
        path={AppRoutes.CreateProperty}
        component={CreateProperty}
        exact></PrivateRoute>
      <Route path='*' component={NotFound}></Route>
    </Switch>
  );
};

export default AppRouter;
