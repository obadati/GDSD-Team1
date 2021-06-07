import React, { useState } from "react";
import "./Calculator.scss";
import { PropertyCategories } from "../../../../components/Filters/Filters";

interface CalculatorData {
  location: string;
  rooms: number;
  size: number;
  category: "rent" | "house" | "apartment";
}

const Calculator = () => {
  const fields: Array<{
    label: string;
    placeholder: string;
    type: "number" | "text" | "dropdown";
    options?: string[];
    name: string;
  }> = [
    {
      name: "location",
      label: "location",
      placeholder: "Enter Location",
      type: "text",
    },
    {
      name: "rooms",
      label: "rooms",
      placeholder: "Enter number of rooms",
      type: "number",
    },
    {
      name: "size",
      label: "size (m^2)",
      placeholder: "Enter size",
      type: "number",
    },
    {
      name: "category",
      label: "category",
      placeholder: "Enter Category",
      type: "dropdown",
      options: Object.keys(PropertyCategories),
    },
  ];

  const [formData, setFormData] = useState<CalculatorData>({
    location: "",
    rooms: 1,
    size: 10,
    category: "rent",
  });

  const handleInputChange = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='price-calculator-component'>
      <form>
        {fields.map(({ label, placeholder, type, name, options }) => (
          <div className='form-group'>
            <label htmlFor={label}>{label}</label>

            {type !== "dropdown" ? (
              <input
                onChange={(e) => handleInputChange(e.target.value, name)}
                placeholder={placeholder}
                className='form-control'
                name={label}
                type={type}
                value={(formData as any)[name]}
                min={1}></input>
            ) : (
              <div className='dropdown'>
                <button
                  style={{ width: "100%" }}
                  className='btn btn-info dropdown-toggle'
                  type='button'
                  id='dropdownMenuButton'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'>
                  {formData.category}
                </button>
                <div
                  style={{ width: "100%" }}
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton'>
                  {options?.map((x) => (
                    <a className='dropdown-item'>{x}</a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </form>
      <button className='app-button'>Get Price</button>
    </div>
  );
};

export default Calculator;
