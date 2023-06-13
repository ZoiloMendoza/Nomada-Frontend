import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import MapDisplay from '@/components/map/mapDisplay';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

export default function Mapa() {
  const router = useRouter();
  const [rutasData, setRutasData] = useState(null);
  const [rutasViaje, setRutasViaje] = useState(null);
  const { idRuta, id, destino } = router.query;
  const [destinoSelect, setdestinoSelect] = useState(destino);
  // console.log(idRuta);
  useEffect(() => {
    const getRuta = async () => {
      try {
        const responseRuta = await axios.get(`${URLRAILWAY}/api/v1/rutas/${idRuta}`);
        if(responseRuta.status === 200) setRutasData(responseRuta.data);
        const responseViaje = await axios.get(`${URLRAILWAY}/api/v1/viajes/${id}`)
        if(responseViaje.status === 200) setRutasViaje(responseViaje.data.rutas); 
      } catch (error) {
        console.log(error)
      }
    };
    if (idRuta && id) {
      getRuta();
    }
  }, [idRuta, id]);
  const handleChange = (event) => {
    setdestinoSelect(event.target.value);
  };
  console.log(rutasViaje, 'VIAJE');
  console.log(destino, 'destino')
  const arregloDestinos = rutasViaje?.map((transporte) => transporte?.transporte?.destino);
  const rutaElegida = arregloDestinos?.indexOf(destinoSelect);
  return (
    <>
      <Box
        sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0 20px',
        }}
      >
      <Select
        id="demo"
        value={destinoSelect}
        label="destinoSelect"
        onChange={handleChange}
        sx={{ width: '230px' }}
      >
      {rutasViaje && rutasViaje?.map((ruta, index) => (
        <MenuItem key={index} value={ruta.transporte.destino}>
          {ruta.transporte.destino}
        </MenuItem>
      ))}
      </Select>
      <h1>Destino: {destinoSelect}</h1>
    </Box>
      {rutasViaje && <MapDisplay actividades={rutasViaje[rutaElegida]?.actividades} />}
    </>
  );
}
