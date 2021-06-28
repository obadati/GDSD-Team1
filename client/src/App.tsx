import React, { useEffect } from "react";
import { connect, ConnectedProps, useStore } from "react-redux";
import { getAgentProperties, getAllProperties } from "./api/properties";
import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import AppRouter from "./containers/Router/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { setAllProperties } from "./store/properties/actions";
import { AppState } from "./store/rootReducer";
import LoaderComponent from "./components/CustomLoader/CustomLoader";
import { setLoadingState } from "./store/loader/actions";
import { setAppUser } from "./store/user/actions";
import { getFromLocalStorage } from "./utility/localStorage";
import { AUTH_USER_KEY } from "./constants/constants";
import { getAllCompanies } from "./api/companies";
import { setAllCompanies } from "./store/companies/actions";
import { useAuth } from "./hooks/auth";
import { UserRoles } from "./api/user";

interface OwnProps extends PropsFromRedux {}

const App: React.FC<OwnProps> = ({ dispatch, loading }) => {
    const state = useStore();
    const { role, id } = useAuth();
    console.log(state.getState());
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        dispatch(setLoadingState(true));
        dispatch(setAppUser(getFromLocalStorage(AUTH_USER_KEY)));
        try {
            const { result: properties } = await (role === UserRoles.Agent
                ? getAgentProperties(id.toString())
                : getAllProperties());
            const { result: companies } = await getAllCompanies();

            if (properties) {
                dispatch(setAllProperties(properties));
            }
            if (companies) {
                dispatch(setAllCompanies(companies));
            }
            dispatch(setLoadingState(false));
        } catch (e) {
            dispatch(setLoadingState(false));
        }
    };

    return (
        <div className="app-wrapper">
            {loading && <LoaderComponent title="sit tight!"></LoaderComponent>}
            <Router>
                <Navigation />
                <AppRouter />
            </Router>
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    loading: state.loader.loading,
});
const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
