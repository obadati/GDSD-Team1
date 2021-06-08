import React, { useState, useEffect } from "react";
import "./Calculator.scss";
import { PropertyCategories } from "../../../../components/Filters/Filters";
import { AvgPrice } from "../../../../api/avg-price";

interface CalculatorData {
  location: string;
  rooms: number;
  size: number;
  category: number;
}

const Calculator = () => {
  const [price, setPrice] = useState(0);

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
    category: 1,
    rooms: 1,
    size: 10,
  });

  const handleInputChange = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async () => {
    try {
      console.log(formData);
      let property = await AvgPrice(
        formData.location,
        formData.category,
        formData.rooms,
        formData.size
      );
      setPrice(property.avgPrice);
      console.log(property.avgPrice);
    } catch (e) {
      console.log(e.response.data.Message);
    }
  };
  useEffect(() => {
    onSubmit();
  }, []);
  useEffect(() => {}, [price]);

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
                  {Object.keys(PropertyCategories)[formData.category - 1]}
                </button>
                <div
                  style={{ width: "100%" }}
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton'>
                  {options?.map((x, index) => (
                    <a
                      className='dropdown-item'
                      onClick={() => {
                        setFormData({ ...formData, category: index + 1 });
                      }}>
                      {" "}
                      {x}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </form>
      <button className='app-button' onClick={onSubmit}>
        Get Price
      </button>
      {price > 0 && <p>Avg Price: € {price}</p>}
    </div>
  );
};

export default Calculator;
