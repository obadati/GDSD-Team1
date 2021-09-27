import React from "react";
import { PropertyCard } from "..";
import { Property } from "../../../../store/properties/types";
import "./PropertyList.scss";

interface OwnProps {
  properties: Property[];
  onLoadMore: () => void;
  hasMoreProperties: boolean;
}

const PropertyList: React.FC<OwnProps> = ({
  properties,
  onLoadMore,
  hasMoreProperties,
}) => {
  return (
    <>
      <div className='properties-list'>
        {properties.length > 0
          ? (properties as Property[]).map((property) => (
              <PropertyCard
                key={`property-card-${property.id}`}
                property={property}
              />
            ))
          : "No Records"}
        {hasMoreProperties && (
          <button className='load-more-button app-button' onClick={onLoadMore}>
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default PropertyList;
