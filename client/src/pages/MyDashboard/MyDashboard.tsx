import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { searchByCategory } from "../../api/properties";
import Filters from "../../components/Filters/Filters";
import SearchBoxComponent from "../../components/SearchBox/SearchBox";
import { Property } from "../../store/properties/types";
import { AppState } from "../../store/rootReducer";
import { PropertyList } from "./components";



const Mydashboardpage: React.FC<PropsFromRedux> = ({ properties }) => {
  const [filteredProps, setFilteredProps] = useState<Property[]>([]);
  useEffect(() => {
    if (properties.length > -1) {
      setFilteredProps(properties);
    }
  }, [properties]);

  const handleFilterSelection = async (selected: number) => {
    if (selected && selected > -1) {
      const { result } = await searchByCategory(selected + 1);
      setFilteredProps(result);
    }
  };

  return (

    <h1 style={{textAlign:'center',marginTop:'250px'}}>My DashBoard</h1>
   
  );
};

const mapStateToProps = (state: AppState) => ({
  properties: state.properties.properties,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Mydashboardpage);
