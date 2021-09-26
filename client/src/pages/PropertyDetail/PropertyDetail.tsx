import React from "react";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import CarouselComponent from "../../components/Carousel/Carousel";
import { Property } from "../../store/properties/types";
import "./PropertyDetail.scss";
import SellerProfile from "../../components/SellerProfile/SellerProfile";
import { getUserInfo, UserRoles } from "../../api/user";
import LoaderComponent from "../../components/CustomLoader/CustomLoader";
import { BASE_URL } from "../../constants/constants";
import { createContractRequest } from "../../api/contracts";
import { AppState } from "../../store/rootReducer";
import { connect, ConnectedProps } from "react-redux";
import { setLoadingState } from "../../store/loader/actions";
import { AppRoutes } from "../../containers/Router/routes";

const PropertyDetail: React.FC<PropsFromRedux> = ({
  user: appUser,
  dispatch,
}) => {
  const history = useHistory();
  const property: Property = (history.location.state as any).property;
  const [isLoading, setIsLoading] = useState(false);
  const [agentInfo, setAgentInfo] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    rating: 0,
    image: "",
    id: -1,
  });

  const loadUserData = async () => {
    if (property.agentId) {
      setIsLoading(true);
      const user = await getUserInfo(parseInt(property.agentId));
      setAgentInfo(user);
      setIsLoading(false);
    }
  };


  useEffect(() => {
    loadUserData();
  }, []);

  const handleRequestContract = async () => {
    try {
      dispatch(setLoadingState(true));
      await createContractRequest(
        property.id,
        agentInfo.id.toString(),
        appUser.id
      );
      dispatch(setLoadingState(false));
    } catch (e) {
      dispatch(setLoadingState(false));
    }
  };

  const handleViewContractRequests = () => {
    history.push(AppRoutes.Contracts);
  };

  return (
    <div className='property-detail-page app-page'>
      <div className='aside'>
        <div className='seller-info'>
          {isLoading && <LoaderComponent title='sit tight!'></LoaderComponent>}
          <SellerProfile
            image={`${BASE_URL}/${agentInfo.image}`}
            sellerId={parseInt(property.agentId)}
            stars={agentInfo.rating}
            sellerName={agentInfo.firstName + " " + agentInfo.lastName}
            sellerCompany={agentInfo.companyName}
            sellerId={agentInfo.id}
            onRequestContract={handleRequestContract}
            onViewContractRequests={
              appUser.role === UserRoles.Agent
                ? handleViewContractRequests
                : undefined
            }
          />
        </div>
        <div className='property-tags'>
          <div className='property-tags__tag'>€ {property.price}</div>
          <div className='property-tags__tag'>{property.category.name}</div>
          <div className='property-tags__tag'>Area: {property.size} m²</div>
          <div className='property-tags__tag'>{property.location}</div>
        </div>
      </div>

      <div className='center'>
        <h3 className='property-detail-page__title'>{property.title}</h3>
        <div className='image-gallery-wrapper'>
          <CarouselComponent
            rounded
            images={
              property.imageProperties.length
                ? property.imageProperties.map((prop) => prop.image)
                : [property.images]
            }
          />
        </div>
        <div className='description'>
          <h3>{property.category.name}</h3>
          <p>{property.description}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PropertyDetail);
