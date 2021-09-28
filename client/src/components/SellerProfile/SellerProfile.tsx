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
  propertyId: string;
  onRequestContract: () => void;
  onViewContractRequests?: () => void;
  onImagesSelected: (a: any[]) => void;
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
  onImagesSelected,
  propertyId,
}) => {
  const { id } = useAuth();
  const handleMessageAgent = async (e: any) => {
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
      history.push(AppRoutes.Messenger);
    } catch (err) {
      console.log(err);
    }
  };
  const [images, setImages] = useState<any[]>([]);
  const history = useHistory();
  const handleImageSelection = (e: any) => {
    if (e.target.files.length > 0) {
      setImages(e.target.files);
    }
  };

  const handleUpload = () => {
    onImagesSelected([...images]);
  };
  console.log({ images });
  const renderModal = () => {
    return (
      <>
        <div
          className='modal fade'
          id={`contract-detail-${propertyId}`}
          role='dialog'
          tabIndex={-1}
          data-backdrop='static'
          data-keyboard='false'
          aria-labelledby={`contract-detail-label-${propertyId}`}
          aria-hidden='true'>
          <div className='modal-dialog modal-dialog-centered ' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h3>Add Images</h3>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <input
                  onChange={handleImageSelection}
                  placeholder='images'
                  multiple
                  id='images'
                  type='file'
                  name='myImage'
                  accept='image/png, image/gif, image/jpeg'
                  max={20000}
                />
              </div>
              <div className='modal-footer'>
                <button
                  onClick={handleUpload}
                  className={`app-button ${!images.length ? "disabled" : ""}`}
                  data-dismiss='modal'
                  disabled={!images.length}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
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
            <button className='action' onClick={handleMessageAgent}>
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
            <button
              data-toggle='modal'
              data-target={`#contract-detail-${propertyId}`}
              className='action add-more-images'>
              Add images
            </button>
            {renderModal()}
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
