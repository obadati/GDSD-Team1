import React from "react";
import { Property } from "../../../../store/properties/types";
import PropertyCard from "../PropertyCard/PropertyCard";
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
              <PropertyCard property={property} />
            ))
          : "No Records"}
      </div>
    </>
  );
};

export default PropertyList;
