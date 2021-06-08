import React, { useState, useEffect } from "react";
import "./Calculator.scss";
import { PropertyCategories } from "../../../../components/Filters/Filters";
import { AvgPrice } from "../../../../api/avg-price";

interface CalculatorData {
  location: string;
  rooms: number;
  size: number;
  category: string;
}

const Calculator = () => {
  const [showText, setShowText] = useState(false);
  const [price, setPrice] = useState();
  const [select, setSelect] = useState("select");
 

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

  const handleChange = (e: any) => {
    setSelect(e.target.value);
  };

  const [formData, setFormData] = useState<CalculatorData>({
    location: "",
    category: "",
    rooms: 1,
    size: 10,
  });

  const handleInputChange = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async () => {
    try {
      console.log(formData);
      let a = await AvgPrice(
        // formData.location,
        // formData.category,
        // formData.rooms,
        // formData.size
        "Merzig","3",3,154
      );
      setPrice(a);
      setShowText(true);
      
      console.log(a.avgPrice);
    } catch (e) {
      console.log(e.response.data.Message);
    }
  };


  useEffect(() => {
    onSubmit();
  }, []);
  useEffect(() => {}, [price]);
  
  const Text = () => <div>You clicked the button! {setPrice}</div>;
  return (
    <div className="price-calculator-component">
      <form>
        {fields.map(({ label, placeholder, type, name, options }) => (
          <div className="form-group">
            <label htmlFor={label}>{label}</label>

            {type !== "dropdown" ? (
              <input
                onChange={(e) => handleInputChange(e.target.value, name)}
                placeholder={placeholder}
                className="form-control"
                name={label}
                type={type}
                value={(formData as any)[name]}
                min={1}
              ></input>
            ) : (
              <div className="dropdown">
                <button
                  style={{ width: "100%" }}
                  className="btn btn-info dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {select}
                </button>
                <div
                  style={{ width: "100%" }}
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  {options?.map((x) => (
                    <a className="dropdown-item"> {x}</a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </form>
      <button className="app-button" onClick={onSubmit}>
        Get Price
      </button>
     
      {showText ? <Text /> : "Not Result Found"}
    </div>
  );
};

export default Calculator;
