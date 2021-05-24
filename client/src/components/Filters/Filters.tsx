import React from "react";
import "./Filters.scss";

const filterTypes = ["city", "size", "rooms", "price"];

const Filters: React.FC<any> = () => {
  return (
    <div className='app-filters'>
      {filterTypes.map((filter) => (
        <div className='app-filter-type'>{filter}</div>
      ))}
    </div>
  );
};

export default Filters;
