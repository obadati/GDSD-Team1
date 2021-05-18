import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import SearchBoxComponent from "../../components/SearchBox/SearchBox";
import { Property } from "../../store/properties/types";
import { AppState } from "../../store/rootReducer";
import "./Home.scss";

const HomePage: React.FC<PropsFromRedux> = ({ properties }) => {
  const [filteredProps, setFilteredProps] = useState<Property[]>([]);

  useEffect(() => {
    if (properties.length > -1) {
      setFilteredProps(properties);
    }
  }, [properties]);

  const renderPropertyCard = (property: Property) => {
    return (
      <div className='property-card'>
        <div>
          <p className='property-name'>{property.title}</p>
          <p className='property-location'>{property.location}</p>
          <p className='property-category'>{property.category.name}</p>
        </div>
      </div>
    );
  };

  return (
    <div className='home-page'>
      <SearchBoxComponent
        list={properties}
        searchFor={["location", "title", "category.name"]}
        onSearchComplete={(list: Property[]) =>
          setFilteredProps(list.length > 0 ? list : properties)
        }
      />
      <div className='properties-list'>
        {filteredProps.length > 0 &&
          (filteredProps as Property[]).map((property) =>
            renderPropertyCard(property)
          )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  properties: state.properties.properties,
});

const connecter = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connecter>;

export default connecter(HomePage);
