import React from "react";
import { PropertyCard } from "..";
import { Property } from "../../../../store/properties/types";
import "./PropertyList.scss";

interface OwnProps {
  properties: Property[];
}

const PropertyList: React.FC<OwnProps> = ({ properties }) => {
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
      </div>
    </>
  );
};

export default PropertyList;
