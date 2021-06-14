import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { searchByCategory } from '../../api/properties';
import Filters from '../../components/Filters/Filters';
import SearchBoxComponent from '../../components/SearchBox/SearchBox';
import { Property } from '../../store/properties/types';
import { AppState } from '../../store/rootReducer';
import LoadingOverlay from 'react-loading-overlay-ts';
import { PropertyList } from './components';
import CustomLoader from '../../components/CustomLoader/CustomLoader';

import './Properties.scss';

const PropertiesPage: React.FC<PropsFromRedux> = ({ properties }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [filteredProps, setFilteredProps] = useState<Property[]>([]);
    useEffect(() => {
        setIsLoading(true);
        if (properties.length > -1) {
            setFilteredProps(properties);
            setIsLoading(false);
        }
    }, [properties]);

    const handleFilterSelection = async (selected: number) => {
        if (selected && selected > -1) {
            setIsLoading(true);
            const { result } = await searchByCategory(selected + 1);
            if (result) {
                setIsLoading(false);
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
                        searchFor={['location', 'title', 'category.name']}
                        onSearchComplete={(list: Property[]) =>
                            setFilteredProps(
                                list.length > 0 ? list : properties
                            )
                        }
                    />
                </div>
                <LoadingOverlay
                    active={isLoading}
                    spinner={<CustomLoader title="Loading the results" />}
                >
                    <PropertyList properties={filteredProps} />
                </LoadingOverlay>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    properties: state.properties.properties,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PropertiesPage);
