import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { searchByCategory } from "../../api/properties";
import Filters from "../../components/Filters/Filters";
import SearchBoxComponent from "../../components/SearchBox/SearchBox";
import { Property } from "../../store/properties/types";
import { AppState } from "../../store/rootReducer";
import PropertyCard from "./components/PropertyCard/PropertyCard";
import PropertyList from "./components/PropertyList/PropertyList";
import "./Home.scss";

const HomePage: React.FC<PropsFromRedux> = ({ properties }) => {
  const [filteredProps, setFilteredProps] = useState<Property[]>([]);

  useEffect(() => {
    if (properties.length > -1) {
      setFilteredProps(properties);
    }
  }, [properties]);

  const handleFilterSelection = async (selected: number) => {
    const { result } = await searchByCategory(selected + 1);
    setFilteredProps(result);
  };

  return (
    <div className='home-page'>
      <div className='aside'>
        <Filters onFilterSelected={handleFilterSelection} />
      </div>
      <div className='center'>
        <div className='search-box-wrapper'>
          <SearchBoxComponent
            list={properties}
            searchFor={["location", "title", "category.name"]}
            onSearchComplete={(list: Property[]) =>
              setFilteredProps(list.length > 0 ? list : properties)
            }
          />
        </div>
        <PropertyList properties={filteredProps} />
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
