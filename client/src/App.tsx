import React, { useEffect, useState } from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';
import { connect, ConnectedProps } from 'react-redux';
import { getAllProperties } from './api/properties';
import './App.scss';
import Navigation from './components/Navigation/Navigation';
import AppRouter from './containers/Router/AppRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { setAllProperties } from './store/properties/actions';
import CustomLoader from './components/CustomLoader/CustomLoader';

interface OwnProps extends PropsFromRedux {}

const App: React.FC<OwnProps> = ({ dispatch }) => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        const { result } = await getAllProperties();
        if (result) {
            setIsLoading(false);
        }
        dispatch(setAllProperties(result));
    };

    return (
        <div className="app-wrapper">
            <LoadingOverlay
                active={isLoading}
                spinner={<CustomLoader title="Loading ..." />}
            >
                <Router>
                    <Navigation />
                    <AppRouter />
                </Router>
            </LoadingOverlay>
        </div>
    );
};

const mapStateToProps = () => ({});
const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
