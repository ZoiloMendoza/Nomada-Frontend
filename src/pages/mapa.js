import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import MapDisplay from '@/components/map/mapDisplay';
import MapDisplayMobile from '@/components/map/mapDisplayMobile';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import SearchBar from '@/components/map/SearchMapa';
//import CircularProgress from '@mui/material/CircularProgress';
import { SkeletonMap } from '@/components/SkeletonsCards/SkeletonMap';
import { useMediaQuery } from '@mui/material';
//import { style } from '@mui/system';

const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

const styles = {
  title: {
    marginLeft: '15px',
    color: '#E91E63',
  },
  titleMobile: {
    marginLeft: '20px',
    color: '#E91E63',
  },
};

export default function Mapa() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [rutasViaje, setRutasViaje] = useState(null);
  const { id, destino } = router.query;
  const [destinoSelect, setdestinoSelect] = useState(destino);
  const isMobile = useMediaQuery((theme) => (theme ? theme.breakpoints.down('sm') : '(max-width:600px)'));
  // console.log(idRuta);
  useEffect(() => {
    const getRuta = async () => {
      try {
        const responseViaje = await axios.get(`${URLRAILWAY}/api/v1/viajes/${id}`);
        if (responseViaje.status === 200) {
          setRutasViaje(responseViaje.data.rutas);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      getRuta();
    }
  }, [id]);

  useEffect(() => {
    if (destino) {
      setdestinoSelect(destino);
    }
  }, [destino]);

  const handleChange = (event) => {
    setdestinoSelect(event.target.value);
  };

  console.log(rutasViaje, 'VIAJE');
  console.log(destino, 'destino');
  const arregloDestinos = rutasViaje?.map((transporte) => transporte?.transporte?.destino);
  const rutaElegida = arregloDestinos?.indexOf(destinoSelect);

  if (loading)
    return (
      <Box
        sx={{
          display: 'flex',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      ></Box>
    );
  return (
    <div>
      <SearchBar />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0 20px',
          paddingRight: '20px',
        }}
      >
        {isMobile ? (
          <div>
            <Select id='demo' value={destinoSelect} onChange={handleChange} sx={{ width: '230px', marginLeft: '20px' }}>
              {rutasViaje &&
                rutasViaje?.map((ruta, index) => (
                  <MenuItem key={index} value={ruta.transporte.destino}>
                    {ruta.transporte.destino}
                  </MenuItem>
                ))}
            </Select>
            <h2 style={styles.titleMobile}>{destinoSelect || 'No tienes destinos, agrega uno en Nuevo Viaje'}</h2>
            <div>{rutasViaje ? <MapDisplayMobile ruta={rutasViaje[rutaElegida]} /> : <SkeletonMap />}</div>
          </div>
        ) : (
          <div>
            <Select id='demo' value={destinoSelect} onChange={handleChange} sx={{ width: '230px', marginLeft: '20px' }}>
              {rutasViaje &&
                rutasViaje?.map((ruta, index) => (
                  <MenuItem key={index} value={ruta.transporte.destino}>
                    {ruta.transporte.destino}
                  </MenuItem>
                ))}
            </Select>
            <h1 style={styles.title}>{destinoSelect || 'No tienes destinos, agrega uno en Nuevo Viaje'}</h1>
            <div>{rutasViaje ? <MapDisplay ruta={rutasViaje[rutaElegida]} /> : <SkeletonMap />}</div>
          </div>
        )}
      </Box>
    </div>
  );
}
