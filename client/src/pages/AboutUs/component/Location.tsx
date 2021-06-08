import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './MapComponet/Marker';

const AnyReactComponent = ({text}: any) => <div>{text}</div>;
const Location: React.FC<any> = () => {
    const [center, setCenter] = useState({lat: 50.5641, lng: 9.6852 });
    const [zoom, setZoom] = useState(9);
    return (
        <div className="container">
        <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBTWsoAm02BvM1IuQAjsFTEoxJVddxkBcs' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
           <Marker
            lat={50.5641}
            lng={9.6852}
            name="My Marker"
            color="blue"
          />
        </GoogleMapReact>
      </div>
      </div>
    );
  };
  export default Location;