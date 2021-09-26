import React, { useState } from "react";
import "./SellerProfile.scss";
import ReactStars from "react-stars";
import Avatar from "../../assets/images/avatar.png";
import { AppState } from "../../store/rootReducer";
import { httpPOST } from "../../utility/http";
import { connect, ConnectedProps } from "react-redux";
import { UserRoles } from "../../api/user";
import { useHistory } from "react-router";
import { AppRoutes } from "../../containers/Router/routes";
import { BASE_URL } from "../../constants/constants";
import { useAuth } from "../../hooks/auth";


interface SellerProfileProps extends PropsFromRedux {
  image: string;
  sellerId: number;
  stars: number;
  sellerName: string;
  sellerCompany: string;
  onRequestContract: () => void;
  onViewContractRequests?: () => void;
}



const SellerProfileComponent: React.FC<SellerProfileProps> = ({
  image,
  sellerId,
  stars,
  sellerName,
  sellerCompany,
  user: appUser,
  onRequestContract,
  onViewContractRequests,
}) => {
  const { id } = useAuth();
  const history = useHistory();
  const handleSubmit = async (e: any) => {

    e.preventDefault();

    const makeConversation = {
      sndId: id,
      rcvId: sellerId,
    };

    try {
      const res = await httpPOST(
        BASE_URL + "/api/message/conversation",
        makeConversation

      );
      history.push(AppRoutes.Messenger)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='seller-info-card'>
      <div className='avatar'>
        <img src={image} alt='avatar' />
      </div>
      <div>
        <h2 className='seller-name'>{sellerName}</h2>
        <h3 className='seller-company'>{sellerCompany}</h3>
      </div>
      {appUser.role === UserRoles.Buyer && (
        <div className='rating'>
          <ReactStars
            count={5}
            value={stars}
            edit={false}
            size={18}
            color2={"#ffd700"}
          />
        </div>
      )}
      <div>
        {appUser.role === UserRoles.Buyer && (
          <>
            <button
              className='action'
              onClick={handleSubmit}>
              Message Agent
            </button>

            <button className='action' onClick={onRequestContract}>
              Request Contract
            </button>
          </>
        )}
        {appUser.role === UserRoles.Agent && (
          <>
            <button className='action' onClick={onViewContractRequests}>
              View Requests
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SellerProfileComponent);
