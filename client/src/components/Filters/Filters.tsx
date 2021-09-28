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
  priceFilter?: boolean;
  onFilterByPrice?: (range: { min?: number; max?: number }) => void;
}
const Filters: React.FC<OwnProps> = ({
  onFilterSelected,
  reset,
  onFilterByPrice,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({
    min: 0,
    max: 0,
  });
  useEffect(() => onFilterSelected(selected as number), [selected]);

  useEffect(() => {
    if (reset) {
      setSelected(null);
    }
  }, [reset]);

  const handleFilterPrice = () => {
    if (priceRange.min || priceRange.max) {
      if (onFilterByPrice) {
        onFilterByPrice({ ...priceRange });
      }
    }
  };

  return (
    <>
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
        <div className='app-filter-type price-filter'>
          <label>Price</label>
          <div className='price-filter__ranges'>
            <input
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: parseInt(e.target.value) })
              }
              type='number'
              placeholder='Min'
              min={1}
              value={priceRange.min || ""}
            />
            <input
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
              }
              type='number'
              placeholder='Max'
              min={1}
              value={priceRange.max || ""}
            />
            <button
              className={`app-button ${
                !(priceRange.min || priceRange.max) ? "disabled" : ""
              }`}
              disabled={!(priceRange.min || priceRange.max)}
              onClick={handleFilterPrice}>
              Go
            </button>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default Filters;
