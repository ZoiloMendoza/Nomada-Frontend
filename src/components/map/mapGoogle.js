import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
const apiKey = process.env.NEXT_PUBLIC_API_GOOGLE;
//import SmallCard from './SmallCard';
const mapaLib = ['places'];
const containerStyle = {
  width: '100%',
  height: '80%',
};

function MapComponent({ latitud, longitud, actividadesDeRuta }) {
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
  //const [smallCardData, setSmallCardData] = useState();
  const [infoWindowData, setInfoWindowData] = useState();
  const [otroHook, setOtroHook] = useState();

  useEffect(() => {
    if (actividadesDeRuta) {
      setOtroHook(
        actividadesDeRuta?.map((actividad) => ({
          nombre: actividad.name,
          fotos: actividad.fotos,
          direccion: actividad.direccion,
        })),
      );
    }
  }, [actividadesDeRuta]);

  console.log(otroHook, 'otro hook');

  useEffect(() => {
    if (actividadesDeRuta) {
      setActividades(
        actividadesDeRuta?.map((actividad) => ({
          address: actividad.name,
          lat: parseFloat(actividad.latitude),
          lng: parseFloat(actividad.longitude),
        })),
      );
    }
  }, [actividadesDeRuta]);

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

  const onMapLoad = (map) => {
    setMapRef(map);
    /*const bounds = new google.maps.LatLngBounds();
    actividades?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
    */
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: mapaLib,
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
  console.log(coords, 'hook coords');
  console.log(actividades, 'puras coordenadas');
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
        {actividades.map(({ address, lat, lng }, ind) => (
          <Marker
            key={ind}
            position={{ lat, lng }}
            onClick={() => {
              handleMarkerClick(ind, lat, lng, address);
            }}
          >
            {isOpen && infoWindowData?.id === ind && (
              <InfoWindow
                onCloseClick={() => {
                  setIsOpen(false);
                }}
              >
                <h3>{infoWindowData.address}</h3>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </>
    </GoogleMap>
  );
}

export default React.memo(MapComponent);
