import React, { useEffect, useState } from "react";
import "./Filters.scss";

const filterTypes = ["rent", "house", "apartment"];

interface OwnProps {
  onFilterSelected: (selected: number) => void;
}
const Filters: React.FC<OwnProps> = ({ onFilterSelected }) => {
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => onFilterSelected(selected as number), [selected]);

  return (
    <div className='app-filters'>
      {filterTypes.map((filter, index) => (
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
