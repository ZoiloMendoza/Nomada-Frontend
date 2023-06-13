import React from 'react';
import MapComponent from './mapGoogle';
import CardComponent from './CardComponent';
import { useRouter } from 'next/router';

const MapDisplay = ({ actividades }) => {
  const router = useRouter();
  const { latitud, longitud } = router.query;

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1', paddingRight: '16px' }}>
        {actividades &&
          actividades.map((actividad) => <CardComponent key={actividad.location_id} actividad={actividad} />)}
      </div>
      <div style={{ flex: '1' }}>
        <MapComponent latitud={latitud} longitud={longitud} />
      </div>
    </div>
  );
};

export default MapDisplay;
