import React, { useState, useEffect } from "react";
import "./AboutUs.scss";
import ContactUs from "./component/Contact";
import GeneralInfo from "./component/GeneralInfo";
import Mission from "./component/Mission";
import Team from "./component/Team";
import Location from "./component/Location";
import Container from "../../components/Container/Container";

const filterTypes = [
  "general info",
  "mission",
  "our team",
  "location",
  "contact us",
];

const aboutComponent = [
  {
    value: "general info",
    data: <GeneralInfo />,
  },
  {
    value: "mission",
    data: <Mission />,
  },
  {
    value: "our team",
    data: <Team />,
  },
  {
    value: "location",
    data: <Location />,
  },
  {
    value: "contact us",
    data: <ContactUs />,
  },
];

const AboutUsPage: React.FC<any> = () => {
  const [selected, setSelected] = useState<any | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  return (
    <div className="properties-page app-page">
      <div className="aside">
        <div className="app-filters">
          {aboutComponent.map((filter, index) => (
            <div
              key={`app-filters-${filter.value}`}
              onClick={() => {
                setSelected(filter.data);
                setSelectedIndex(index);
              }}
              className={`app-filter-type ${
                index === selectedIndex ? `app-filter-type--selected` : ""
              }`}
            >
              {filter.value}
            </div>
          ))}
        </div>
      </div>
      <div className="center">
        {selected !== null ? (
          <Container selected={selected} />
        ) : (
          <GeneralInfo />
        )}
      </div>
    </div>
  );
};
export default AboutUsPage;
