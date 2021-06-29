import React from "react";
import { BASE_URL } from "../../../../constants/constants";
import "./ContractCard.scss";
import paperClipIcon from "../../../../assets/images/paper-clip.png";
import { Contract } from "../../../../api/contracts";

interface OwnProps {
  contract: Contract;
}

const ContractCard: React.FC<OwnProps> = ({ contract }) => {
  return (
    <div className='contract-card raised-tile'>
      <div className='paper-clip-icon'>
        <img src={paperClipIcon}></img>
      </div>
      <div className='image-wrapper'>
        <img src={`${BASE_URL}/${contract.propertyDetail.images}`} />
      </div>
      <p className='title'>{contract.title}</p>
      <p className='created-at'>Created at: {contract.dateCreate}</p>
      <p className='valid-till'>Valid till: {contract.dateValid}</p>
    </div>
  );
};

export default ContractCard;
