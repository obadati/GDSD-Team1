import React from "react";
import "./AvgPriceCalculator.scss";
import Calculator from "./components/Calculator/Calculator";

const AvgPriceCalculator = () => {
  return (
    <div className='avg-price-calculator-page app-page'>
      <div className='wrapper'>
        <h3 className='page-title'>Get Average prices</h3>
        <div>
          <Calculator />
        </div>
      </div>
    </div>
  );
};

export default AvgPriceCalculator;
