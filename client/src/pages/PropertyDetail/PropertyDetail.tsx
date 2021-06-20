import React from "react";
import { useHistory } from "react-router";
import CarouselComponent from "../../components/Carousel/Carousel";
import { Property } from "../../store/properties/types";
import "./PropertyDetail.scss";
import SellerProfile from "../../components/SellerProfile/SellerProfile";

const PropertyDetail: React.FC<any> = () => {
    const history = useHistory();
    const property: Property = (history.location.state as any).property;

    return (
        <div className="property-detail-page app-page">
            <div className="aside">
                <div className="seller-info">
                    <SellerProfile
                        stars={2}
                        sellerName="Sample Seller"
                        sellerCompany="Sample Company"
                        actions={[
                            "message-agent",
                            "create-contact",
                            "get-average-price",
                            "add-to-compare",
                        ]}
                    />
                </div>
                <div className="property-tags">
                    <div className="property-tags__tag">€ {property.price}</div>
                    <div className="property-tags__tag">
                        {property.category.name}
                    </div>
                    <div className="property-tags__tag">
                        Area: {property.size} sqm
                    </div>
                    <div className="property-tags__tag">
                        {property.location}
                    </div>
                </div>
            </div>
            <div className="center">
                <h3 className="property-detail-page__title">
                    {property.title}
                </h3>
                <div className="image-gallery-wrapper">
                    <CarouselComponent
                        rounded
                        images={[
                            property.images,
                            "assests/uploads/propertyImage/property-1621610048377.jpg",
                            "assests/uploads/propertyImage/property-1621609809384.jpg",
                            "assests/uploads/propertyImage/property-1621609358303.jpg",
                        ]}
                    />
                </div>
                <div className="description">
                    <h3>{property.category.name}</h3>
                    <p>
                        {property.description} Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Pariatur aut voluptatem,
                        illo accusantium consectetur blanditiis, eius beatae non
                        dolore quo similique facilis molestias quas. Dicta, cum.
                        Pariatur quas natus temporibus. Recusandae amet
                        voluptatem sapiente sequi expedita impedit vitae
                        adipisci culpa quo dolore maiores dignissimos deserunt,
                        ex asperiores. Unde autem, tempora ab itaque voluptatum
                        neque doloribus impedit molestias dolorum animi iste!
                        Accusantium, maxime ipsam nihil eveniet suscipit ullam
                        assumenda nisi distinctio aut deserunt et nam inventore
                        nulla voluptatum obcaecati commodi vitae quaerat
                        voluptas. Impedit aliquam iusto quam ratione harum culpa
                        porro. Dignissimos exercitationem maiores ad fugiat
                        ipsum harum minima modi porro? Delectus, ea illo.
                        Architecto nesciunt assumenda hic dolores maiores
                        excepturi? Autem omnis explicabo beatae, architecto
                        eligendi quisquam minima a commodi? Molestias sed
                        commodi nemo, enim vel totam inventore placeat iste
                        deserunt, magnam architecto iure minus quisquam nisi
                        facere voluptatem consectetur vero dolor laboriosam
                        tempora debitis natus repudiandae nobis animi. Quas?
                        Distinctio molestiae labore sit perspiciatis vitae animi
                        vel amet debitis, natus error porro numquam voluptatibus
                        minus quod ipsa vero provident sapiente harum hic iste
                        quia libero, at nulla magnam. Quod. Quo, reprehenderit
                        corporis! Aspernatur, autem omnis? Magni velit minima ea
                        ullam, fuga impedit eligendi doloremque corrupti nulla
                        quasi quas laborum, molestiae dicta? Minima a quod
                        pariatur. Sit, nobis! Voluptatibus,
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
