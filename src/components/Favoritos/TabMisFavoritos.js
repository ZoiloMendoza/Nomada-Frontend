import * as React from 'react';
import { Grid, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useAuth } from '@/utils/useAuth';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

const NoViajesMessage = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#333',
      fontSize: '20px',
      fontWeight: 'bold',
      width: '100%',
      boxSizing: 'border-box',
    }}
  >
    No tiene más viajes por el momento ...
  </Box>
);
/*const DynamicMisViajesCard = dynamic(() => import('@/components/misViajes/MisViajesCard'), {
  loading: () => (
    <Box
      sx={{
        display: 'flex',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
  
      <CircularProgress />
    </Box>
  ),
});
*/
export default function MisViajes() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [favoritosDelUsuario, setfavoritosDelUsuario] = useState([]);
  const [favoritosDelViaje, setFavoritosDelViaje] = useState([]);
  //const [viajesInvidatos, setViajesInvitados] = useState([]);
  const { id } = router.query;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const usuario = useAuth();
  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const favoritosDelViaje = await axios.get(`${URLRAILWAY}/api/v1/viajes/${id}`);
        if (favoritosDelViaje.status === 200) {
          setFavoritosDelViaje(favoritosDelViaje.data.rutas);
          console.log(favoritosDelViaje.data.rutas, 'Favoritos del viaje');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    if (id) fetchFavoritos();
  }, [id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoritosDelUsuario = await axios.get(`${URLRAILWAY}/api/v1/users/${usuario.idUser}`);
        if (favoritosDelUsuario.status === 200) {
          setfavoritosDelUsuario(favoritosDelUsuario.data.viajes);

          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    if (usuario) fetchData();
  }, [usuario]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', padding: '5px', backgroundColor: '#EAEDED' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '10px' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          {favoritosDelViaje.length > 0 ? (
            favoritosDelViaje.map((ruta, index) => (
              <Tab key={index} label={`${ruta?.transporte?.destino}`} {...a11yProps(index)} />
            ))
          ) : (
            <NoViajesMessage />
          )}
        </Tabs>
      </Box>
    </Box>
  );
}
