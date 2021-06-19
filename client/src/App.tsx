import React, { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import { connect, ConnectedProps } from "react-redux";
import { getAllProperties } from "./api/properties";
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

interface OwnProps extends PropsFromRedux {}

const App: React.FC<OwnProps> = ({ dispatch, loading }) => {
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        dispatch(setLoadingState(true));
        dispatch(setAppUser(getFromLocalStorage(AUTH_USER_KEY)));
        const { result } = await getAllProperties();
        if (result) {
            dispatch(setAllProperties(result));
        }
        dispatch(setLoadingState(false));
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
