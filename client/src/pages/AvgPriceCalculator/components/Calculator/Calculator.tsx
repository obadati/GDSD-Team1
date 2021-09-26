import React, { useState, useEffect } from "react";
import "./Calculator.scss";
import { PropertyCategories } from "../../../../components/Filters/Filters";
import { AvgPrice } from "../../../../api/avg-price";
import {
  MAX_ROOMS_ALLOWED,
  MIN_ROOMS_ALLOWED,
} from "../../../../constants/constants";

interface CalculatorData {
  location: string;
  rooms: number;
  size: number;
  category: number;
}

const Calculator = () => {
  const [price, setPrice] = useState<number>(-1);
  const [error, setError] = useState<boolean>(false);
  console.log({ price });

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
    if (name === "rooms") {
      if (parseInt(value) > MAX_ROOMS_ALLOWED) {
        value = MAX_ROOMS_ALLOWED.toString();
      } else if (parseInt(value) < MIN_ROOMS_ALLOWED) {
        value = MIN_ROOMS_ALLOWED.toString();
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async () => {
    try {
      let property = await AvgPrice(
        formData.location,
        formData.category,
        formData.rooms,
        formData.size
      );
      setPrice(property.avgPrice);
    } catch (e: any) {
      setError(true);
      console.log(e.response.data.Message);
    }
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
                        setFormData({
                          ...formData,
                          category: index + 1,
                        });
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
      <button
        className={`app-button ${
          !formData.location || !formData.category ? "disabled" : ""
        }`}
        onClick={onSubmit}
        disabled={!formData.location || !formData.category}>
        Get Price
      </button>
      {!error && (
        <>
          {price > 0 && (
            <p style={{ margin: "0.5rem 0" }}>
              You can expect to pay approximately € {price} in{" "}
              {formData.location}
            </p>
          )}
          {price === 0 && (
            <p style={{ margin: "0.5rem 0" }}>
              Looks like we don't have enough data for {formData.location},
              We'll keep crunching numbers for a better estimation next time you
              visit 😉
            </p>
          )}
        </>
      )}
      {error && (
        <p style={{ margin: "0.5rem 0", color: "red" }}>
          Looks like something went wrong, refresh and try again
        </p>
      )}
    </div>
  );
};

export default Calculator;
