import React, { useEffect } from "react";
import { BASE_URL } from "../../../../constants/constants";
import "./ContractCard.scss";
import paperClipIcon from "../../../../assets/images/paper-clip.png";
import { Contract } from "../../../../api/contracts";
import { AppState } from "../../../../store/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import { UserRoles } from "../../../../api/user";

interface OwnProps extends PropsFromRedux {
  contract: Contract;
}

const ContractCard: React.FC<OwnProps> = ({ contract, user: appUser }) => {
  const handleUpdateContract = () => {};

  const detailModal = () => {
    return (
      <>
        <div
          className='modal fade'
          id={`contract-detail-${contract.id}`}
          role='dialog'
          aria-labelledby='contract-detail-label'
          aria-hidden='true'>
          <div className='modal-dialog modal-dialog-centered ' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='contract-detail-label'>
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
                  <p>Requested by : buyerName</p>
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
                        Select Status
                      </button>
                      <div
                        className='dropdown-menu'
                        aria-labelledby='dropdownMenuButton'>
                        <a className='dropdown-item' href='#'>
                          Approve
                        </a>
                        <a className='dropdown-item' href='#'>
                          Reject
                        </a>
                        <a className='dropdown-item' href='#'>
                          Terminate
                        </a>
                      </div>
                    </div>
                  </div>
                  <input type='date' placeholder='expiry date'></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div
      data-toggle='modal'
      data-target={`#contract-detail-${contract.id}`}
      className={`contract-card raised-tile ${
        contract.status !== "approved" ? "contract-card--pending" : ""
      } ${appUser.role === UserRoles.Agent ? "contract-card--can-edit" : ""}`}>
      <div className='paper-clip-icon'>
        <img src={paperClipIcon}></img>
      </div>
      <div className='image-wrapper'>
        <img src={`${BASE_URL}/${contract.propertyDetail?.images}`} />
      </div>
      <p className='title'>{contract.title}</p>
      {contract.status === "approved" && (
        <>
          <p className='created-at'>Created at: {contract.dateCreate}</p>
          <p className='valid-till'>Valid till: {contract.dateValid}</p>
        </>
      )}
      {contract.status !== "approved" && (
        <>
          <p className='created-at'>
            {appUser.role === UserRoles.Agent
              ? `Requested from ${contract.buyer}`
              : appUser.role === UserRoles.Buyer
              ? `Approval request sent to agent: ${contract.seller}`
              : ""}
          </p>
        </>
      )}
      {appUser.role === UserRoles.Agent && detailModal()}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ContractCard);
