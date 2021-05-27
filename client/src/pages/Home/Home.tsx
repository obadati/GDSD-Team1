import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../store/rootReducer";
import "./Home.scss";

const HomePage: React.FC<PropsFromRedux> = ({ properties }) => {
  return <div className='home-page'></div>;
};

const mapStateToProps = (state: AppState) => ({
  properties: state.properties.properties,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomePage);
