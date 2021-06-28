import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { searchByCategory } from "../../api/properties";
import { UserRoles } from "../../api/user";
import Filters from "../../components/Filters/Filters";
import SearchBoxComponent from "../../components/SearchBox/SearchBox";
import { Property } from "../../store/properties/types";
import { AppState } from "../../store/rootReducer";
import { PropertyList } from "./components";

import "./Properties.scss";

interface OwnProps extends PropsFromRedux {}

const PropertiesPage: React.FC<OwnProps> = ({ properties, userRole }) => {
    const [filteredProps, setFilteredProps] = useState<Property[]>([]);
    useEffect(() => {
        if (properties.length > -1) {
            setFilteredProps(properties);
        }
    }, [properties]);

    const handleFilterSelection = async (selected: number) => {
        if (selected > -1 && selected !== null) {
            const { result } = await searchByCategory(selected + 1);
            if (result) {
            }
            setFilteredProps(result);
        }
    };

    return (
        <div className="properties-page app-page">
            <div className="aside">
                <Filters onFilterSelected={handleFilterSelection} />
            </div>
            <div className="center">
                <div className="search-box-wrapper">
                    <SearchBoxComponent
                        list={properties}
                        searchFor={["location", "title", "category.name"]}
                        onSearchComplete={(list: Property[]) =>
                            setFilteredProps(
                                list.length > 0 ? list : properties
                            )
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
    userRole: state.user.role as UserRoles,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PropertiesPage);
