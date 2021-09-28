import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../../constants/constants";
import "./ContractCard.scss";
import paperClipIcon from "../../../../assets/images/paper-clip.png";
import {
  Contract,
  ContractStatus,
  updateContract,
} from "../../../../api/contracts";
import { AppState } from "../../../../store/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import { UserRoles } from "../../../../api/user";

interface OwnProps extends PropsFromRedux {
  contract: Contract;
  onContractUpdated: () => void;
}

const ContractCard: React.FC<OwnProps> = ({
  contract,
  user: appUser,
  onContractUpdated,
}) => {
  const handleUpdateContract = async () => {
    try {
      await updateContract(contract.id, contractStatus, expirationDate);
      onContractUpdated && onContractUpdated();
    } catch (e) {}
  };
  const [contractStatus, setContractStatus] = useState<ContractStatus>(
    contract.status
  );

  const [expirationDate, setExpirationDate] = useState<string>(
    contract.dateValid
  );

  const detailModal = () => {
    return (
      <>
        <div
          className='modal fade'
          id={`contract-detail-${contract.id}`}
          role='dialog'
          tabIndex={-1}
          data-backdrop='static'
          data-keyboard='false'
          aria-labelledby={`contract-detail-label-${contract.id}`}
          aria-hidden='true'>
          <div className='modal-dialog modal-dialog-centered ' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5
                  className='modal-title'
                  id={`contract-detail-label-${contract.id}`}>
                  {contract.title}
                </h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='modal-image-wrapper'>
                  <img src={`${BASE_URL}/${contract.propertyDetail?.images}`} />
                </div>
                <div className='contract-details'>
                  <p>Requested by : {contract.buyer}</p>
                  <p>Date created: {contract.dateCreate || "TBD"}</p>
                  <p>Date Valid: {contract.dateValid || "TBD"}</p>
                  <div className='status-selector'>
                    <p>Contract Status: </p>
                    <div className='dropdown'>
                      <button
                        className='app-button dropdown-toggle'
                        type='button'
                        id='dropdownMenuButton'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'>
                        {contractStatus}
                      </button>
                      <div
                        className='dropdown-menu'
                        aria-labelledby='dropdownMenuButton'>
                        <a
                          onClick={() =>
                            setContractStatus(ContractStatus.Approved)
                          }
                          className='dropdown-item'>
                          Approve
                        </a>
                        <a
                          onClick={() =>
                            setContractStatus(ContractStatus.Rejected)
                          }
                          className='dropdown-item'>
                          Reject
                        </a>
                        <a
                          onClick={() =>
                            setContractStatus(ContractStatus.Rejected)
                          }
                          className='dropdown-item'>
                          Terminate
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='expiry-selector'>
                    <p>Expiration Date</p>
                    <input
                      type='text'
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                      placeholder='expiry date (MM/DD/YYYY)'></input>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  className={`app-button ${!expirationDate ? "disabled" : ""}`}
                  data-dismiss='modal'
                  disabled={!expirationDate}
                  onClick={handleUpdateContract}>
                  Update Contract
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div
        data-toggle='modal'
        data-target={`#contract-detail-${contract.id}`}
        className={`contract-card raised-tile ${
          contract.status !== "approved" ? "contract-card--pending" : ""
        } ${
          appUser.role === UserRoles.Agent ? "contract-card--can-edit" : ""
        }`}>
        <div className='paper-clip-icon'>
          <img src={paperClipIcon}></img>
        </div>
        <div className='image-wrapper'>
          <img src={`${BASE_URL}/${contract.propertyDetail?.images}`} />
        </div>
        <p className='title'>{contract.title}</p>
        {contract.status === "approved" && (
          <div className='contract-details'>
            {appUser.role === UserRoles.Buyer && (
              <p className='created-at'>Agent: {contract.seller}</p>
            )}
            {appUser.role === UserRoles.Agent && (
              <p className='created-at'>Buyer: {contract.buyer}</p>
            )}
            <p className='created-at'>Created at: {contract.dateCreate}</p>
            <p className='valid-till'>Valid till: {contract.dateValid}</p>
          </div>
        )}
        {contract.status !== "approved" && (
          <div className='contract-details'>
            <p className='created-at'>
              {appUser.role === UserRoles.Agent
                ? `Requested from ${contract.buyer}`
                : appUser.role === UserRoles.Buyer
                ? `Approval request sent to agent: ${contract.seller}`
                : ""}
            </p>
          </div>
        )}
      </div>
      {appUser.role === UserRoles.Agent && detailModal()}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ContractCard);
