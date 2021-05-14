import React from "react";
import { connect, ConnectedProps } from "react-redux";
import "./App.scss";

interface OwnProps extends PropsFromRedux {}

const App: React.FC<OwnProps> = () => {
  return <div className='app'>Hello World</div>;
};

const mapStateToProps = () => ({});
const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
