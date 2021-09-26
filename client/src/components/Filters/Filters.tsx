import React, { useEffect, useState } from "react";
import "./Filters.scss";

export enum PropertyCategories {
  Rent = "rent",
  House = "house",
  Apartment = "apartment",
}

interface OwnProps {
  onFilterSelected: (selected: number) => void;
  reset: boolean;
}
const Filters: React.FC<OwnProps> = ({ onFilterSelected, reset }) => {
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => onFilterSelected(selected as number), [selected]);

  useEffect(() => {
    if (reset) {
      setSelected(null);
    }
  }, [reset]);

  return (
    <div className='app-filters'>
      {Object.keys(PropertyCategories).map((filter, index) => (
        <div
          key={`app-filters-${filter}`}
          onClick={() => setSelected(index)}
          className={`app-filter-type ${
            index === selected ? `app-filter-type--selected` : ""
          }`}>
          {filter}
        </div>
      ))}
    </div>
  );
};

export default Filters;
