import React, { useEffect } from "react";
import { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  Contract,
  ContractStatus,
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
  const [pendingContracts, setPendingContracts] = useState<Contract[]>([]);
  const [approvedContracts, setApprovedContracts] = useState<Contract[]>([]);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  useEffect(() => {
    if (contracts.length) {
      const approved = contracts.filter(
        (contract) => contract.status === ContractStatus.Approved
      );
      const pending = contracts.filter(
        (contract) => contract.status === ContractStatus.Pending
      );

      setApprovedContracts(approved.length ? approved : []);
      setPendingContracts(pending.length ? pending : []);
    }
  }, [contracts]);

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
        {approvedContracts.length ? (
          <>
            <h5>Approved Contracts</h5>
            <div className='contracts-group'>
              {approvedContracts.map((contract) => (
                <ContractCard
                  contract={contract}
                  onContractUpdated={() => loadData()}
                />
              ))}
            </div>
          </>
        ) : (
          <p>No approved contracts yet!</p>
        )}
        {pendingContracts.length ? (
          <>
            <h5>Pending Contracts</h5>
            <div className='contracts-group'>
              {pendingContracts.map((contract) => (
                <ContractCard
                  contract={contract}
                  onContractUpdated={() => loadData()}
                />
              ))}
            </div>
          </>
        ) : (
          <p>No pending contracts yet!</p>
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
