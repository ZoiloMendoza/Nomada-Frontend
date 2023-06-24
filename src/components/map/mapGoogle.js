import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
const apiKey = process.env.NEXT_PUBLIC_API_GOOGLE;
import SmallCard from './SmallCard';

const containerStyle = {
  width: '100%',
  height: '80%',
};

function MapComponent({ latitud, longitud, actividadesDeRuta}) {
  console.log(latitud, longitud);
  const [isLoading, setIsLoading] = useState(true);
  const [actividades, setActividades] = useState(null);
  const router = useRouter();
  const { latitudS, longitudS } = router.query;
  const [coords, setCoords] = useState({
    lat: null,
    lng: null,
  });
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [smallCardData, setSmallCardData] = useState();
  useEffect(() => {
    if(actividadesDeRuta){
      setActividades(actividadesDeRuta?.map((actividad) => {
        return {
          address: actividad.name,
          lat: actividad.latitude,
          lng: actividad.longitude
        }
      }))
    }
  },[actividadesDeRuta])

  const markers = [
    { address: 'Address1', lat: 18.5204, lng: 73.8567 },
    { address: 'Address2', lat: 18.5314, lng: 73.8446 },
    { address: 'Address3', lat: 18.5642, lng: 73.7769 },
  ];

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setSmallCardData({ id, address });
    setIsOpen(true);
  };

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

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
  console.log(actividades, 'puras coordenadas')
  return (
    <GoogleMap
      onLoad={onMapLoad}
      mapContainerStyle={containerStyle}
      center={coords}
      zoom={11}
      onClick={() => setIsOpen(false)}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        {markers.map(({ address, lat, lng }, ind) => (
          <Marker
            key={ind}
            position={{ lat, lng }}
            onClick={() => {
              handleMarkerClick(ind, lat, lng, address);
            }}
          >
            {isOpen && smallCardData?.id === ind && (
              <SmallCard
                onCloseClick={() => {
                  setIsOpen(false);
                }}
              />
            )}
          </Marker>
        ))}
      </>
    </GoogleMap>
  );
}

export default React.memo(MapComponent);
