import React from "react";
import { BASE_URL } from "../../../../constants/constants";
import "./ContractCard.scss";
import paperClipIcon from "../../../../assets/images/paper-clip.png";

interface OwnProps {
    title: string;
    imgUrl: string;
}

const ContractCard: React.FC<OwnProps> = ({ title, imgUrl }) => {
    return (
        <div className="contract-card raised-tile">
            <div className="paper-clip-icon">
                <img src={paperClipIcon}></img>
            </div>
            <div className="image-wrapper">
                <img src={`${BASE_URL}/${imgUrl}`} />
            </div>
            <p className="title">{title}</p>
        </div>
    );
};

export default ContractCard;
