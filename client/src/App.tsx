import React from "react";
import { connect, ConnectedProps } from "react-redux";
import "./App.scss";
import AppRouter from "./containers/Router/AppRouter";

interface OwnProps extends PropsFromRedux {}

const App: React.FC<OwnProps> = () => <AppRouter />;

const mapStateToProps = () => ({});
const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
