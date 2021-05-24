import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getAllProperties } from "./api/properties";
import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import AppRouter from "./containers/Router/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { setAllProperties } from "./store/properties/actions";

interface OwnProps extends PropsFromRedux {}

const App: React.FC<OwnProps> = ({ dispatch }) => {
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { result } = await getAllProperties();
    dispatch(setAllProperties(result));
  };

  return (
    <>
      <Router>
        <Navigation />
        <AppRouter />
      </Router>
    </>
  );
};

const mapStateToProps = () => ({});
const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
