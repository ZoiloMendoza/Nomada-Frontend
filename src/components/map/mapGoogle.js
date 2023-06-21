import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
const apiKey = process.env.NEXT_PUBLIC_API_GOOGLE;

const containerStyle = {
  width: '100%',
  height: '80%',
};

function MapComponent({ latitud, longitud }) {
  console.log(latitud, longitud);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { latitudS, longitudS } = router.query;
  const [coords, setCoords] = useState({
    lat: null,
    lng: null,
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  useEffect(() => {
    if (latitud && longitud) {
      setCoords({
        lat: parseFloat(latitud),
        lng: parseFloat(longitud),
      });
      setIsLoading(false);
    } else if (latitudS && longitudS) {
      setCoords({
        lat: parseFloat(latitudS),
        lng: parseFloat(longitudS),
      });
      setIsLoading(false);
    }
  }, [latitud, longitud, latitudS, longitudS]);
  if (isLoading || isLoaded == false) {
    return <p>Cargando mapa...</p>;
  }
  return (
    <GoogleMap mapContainerStyle={containerStyle} center={coords} zoom={11}>
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  );
}

export default React.memo(MapComponent);
