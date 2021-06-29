import React, { useEffect } from "react";
import { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  Contract,
  getAgentContracts,
  getBuyerContracts,
} from "../../api/contracts";
import { UserRoles } from "../../api/user";
import { useAuth } from "../../hooks/auth";
import { AppState } from "../../store/rootReducer";
import ContractCard from "./components/ContractCard/ContractCard";
import "./Contracts.scss";

const ContractsPage: React.FC<PropsFromRedux> = ({ properties }) => {
  const { id, role } = useAuth();
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    const { result } = await (role === UserRoles.Agent
      ? getAgentContracts(id.toString())
      : getBuyerContracts(id.toString()));
    setContracts(result);
  };

  return (
    <div className='app-page contracts-page'>
      <h3 className='page-title'>Contracts</h3>
      <div className='contracts-wrapper'>
        {contracts.length ? (
          contracts.map((contract) => (
            <ContractCard
              title={contract.title}
              imgUrl={contract.propertyDetail.images}
            />
          ))
        ) : (
          <p>No contracts yet!</p>
        )}
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
