import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../store/rootReducer";
import ContractCard from "./components/ContractCard/ContractCard";
import "./Contracts.scss";

const ContractsPage: React.FC<PropsFromRedux> = ({ properties }) => {
    return (
        <div className="app-page contracts-page">
            <h3 className="page-title">Contracts</h3>
            <div className="contracts-wrapper">
                {properties.map((property) => (
                    <ContractCard
                        title={property.title}
                        imgUrl={property.images}
                    />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    properties: state.properties.properties,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ContractsPage);
