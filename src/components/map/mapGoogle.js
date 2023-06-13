import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const apiKey = process.env.NEXT_PUBLIC_API_GOOGLE;

const containerStyle = {
  width: '100%',
  height: '80%',
};

function MapComponent({ latitud, longitud }) {
  console.log(latitud, longitud);
  const center = {
    lat: parseFloat(latitud),
    lng: parseFloat(longitud),
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapComponent);
