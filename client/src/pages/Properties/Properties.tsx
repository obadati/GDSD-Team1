import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router";
import { getAllProperties, searchByCategory } from "../../api/properties";
import { UserRoles } from "../../api/user";
import Filters from "../../components/Filters/Filters";
import SearchBoxComponent from "../../components/SearchBox/SearchBox";
import { AppRoutes } from "../../containers/Router/routes";
import { Property } from "../../store/properties/types";
import { AppState } from "../../store/rootReducer";
import { PropertyList } from "./components";
import addIcon from "../../assets/images/add.png";

import "./Properties.scss";
import { useAuth } from "../../hooks/auth";
import { appendToProperties } from "../../store/properties/actions";
import { RESULTS_PER_PAGE } from "../../constants/constants";

interface OwnProps extends PropsFromRedux {}

const PropertiesPage: React.FC<OwnProps> = ({
  properties,
  userRole,
  dispatch,
}) => {
  const history = useHistory();
  const { role } = useAuth();
  const [filteredProps, setFilteredProps] = useState<Property[]>([]);
  const [resetFilters, setResetFilters] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreProperties, setHasMoreProperties] = useState(true);

  useEffect(() => {
    if (properties.length > -1) {
      setFilteredProps(properties);
    }
  }, [properties]);

  useEffect(() => {
    if (pageNumber > 1) {
      loadMoreProperties(pageNumber);
    }
  }, [pageNumber]);

  const loadMoreProperties = async (page: number) => {
    const { result: loadedProperties } = await getAllProperties(page);
    if (
      loadMoreProperties.length < RESULTS_PER_PAGE ||
      !loadMoreProperties.length
    ) {
      setHasMoreProperties(false);
    }
    dispatch(appendToProperties(loadedProperties));
  };

  const handleFilterSelection = async (selected: number) => {
    if (selected > -1 && selected !== null) {
      const { result } = await searchByCategory(selected + 1);
      if (result) {
        setFilteredProps(result);
      }
    }
  };

  const handleResetFilters = () => {
    setResetFilters(true);
  };

  const handleLoadMore = () => {
    setFilteredProps(properties);
    handleResetFilters();
    setPageNumber(pageNumber + 1);
  };

  return (
    <div className='properties-page app-page'>
      <div className='aside'>
        <Filters
          reset={resetFilters}
          onFilterSelected={handleFilterSelection}
        />
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
          {role === UserRoles.Agent && (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => history.push(AppRoutes.CreateProperty)}>
              <img
                style={{ height: "25px", width: "25px" }}
                src={addIcon}></img>
            </div>
          )}
        </div>
        <PropertyList
          hasMoreProperties={hasMoreProperties}
          onLoadMore={handleLoadMore}
          properties={filteredProps}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  properties: state.properties.properties,
  userRole: state.user.role as UserRoles,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PropertiesPage);
