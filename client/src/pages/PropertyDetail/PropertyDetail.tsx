import React from "react";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import CarouselComponent from "../../components/Carousel/Carousel";
import { Property, User } from "../../store/properties/types";
import "./PropertyDetail.scss";
import SellerProfile from "../../components/SellerProfile/SellerProfile";
import { getUserInfo } from "../../api/user";
import LoaderComponent from "../../components/CustomLoader/CustomLoader";
import { BASE_URL } from "../../constants/constants";

const PropertyDetail: React.FC<any> = () => {
  const history = useHistory();
  const property: Property = (history.location.state as any).property;
  const [isLoading, setIsLoading] = useState(false);
  const [agentInfo, setAgentInfo] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    rating: 0,
    image: "",
  });

  const loadUserData = async () => {
    if (property.agentId) {
      setIsLoading(true);
      const user = await getUserInfo(parseInt(property.agentId));
      setAgentInfo(user);
      setIsLoading(false);
      console.log(user, "user");
    }
  };
  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <div className='property-detail-page app-page'>
      <div className='aside'>
        <div className='seller-info'>
          {isLoading && <LoaderComponent title='sit tight!'></LoaderComponent>}
          <SellerProfile
            image={`${BASE_URL}/${agentInfo.image}`}
            stars={agentInfo.rating}
            sellerName={agentInfo.firstName + " " + agentInfo.lastName}
            sellerCompany={agentInfo.companyName}
            actions={[
              "message-agent",
              "create-contact",
              "get-average-price",
              "add-to-compare",
            ]}
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
            images={property.imageProperties.map((prop) => prop.image)}
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

export default PropertyDetail;
