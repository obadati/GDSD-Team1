import React from "react";
import { Property } from "../../../../store/properties/types";
import { BASE_URL } from "../../../../api/properties";
import "./PropertyCard.scss";
import { useHistory } from "react-router";
import { AppRoutes } from "../../../../containers/Router/routes";
import editIcon from "../../../../assets/images/edit-icon.png";
import { AppState } from "../../../../store/rootReducer";
import { UserRoles } from "../../../../api/user";
import { connect, ConnectedProps } from "react-redux";

interface OwnProps extends PropsFromRedux {
    property: Property;
}

const PropertyCard: React.FC<OwnProps> = ({ property, userRole }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(AppRoutes.PropertyDetail.replace(":uid", property.id), {
            property,
        });
    };

    const handleEditProperty = (e: any) => {
        e.stopPropagation();
        history.push(AppRoutes.EditProperty.replace(":uid", property.id), {
            property,
            editable: true,
        });
    };

    return (
        <div className="property-card" onClick={handleClick}>
            <div className="property-card__thumbnail">
                <img src={`${BASE_URL}/${property.images}`} alt="no img" />
            </div>
            <div className="property-card__content">
                <p className="property-card__content__name">{property.title}</p>
                <p className="property-card__content__location">
                    {property.location}
                </p>
                <p className="property-card__content__price">
                    € {property.price}
                </p>
                <div className="tags-and-actions">
                    <div className="tags">
                        <span className="property-card__content__tag property-card__content__tag--category">
                            {property.category.name}
                        </span>
                        <span className="property-card__content__tag property-card__content__tag--size">
                            {property.size} m²
                        </span>
                    </div>
                    {userRole !== UserRoles.Buyer && (
                        <div
                            className="property-card__actions"
                            onClick={handleEditProperty}
                        >
                            <div className="card-action">
                                <img src={editIcon}></img>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const mapStateToProps = (state: AppState) => ({
    userRole: state.user.role as UserRoles,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PropertyCard);
