import * as React from 'react';
//import ButtonMisViajes from '@/components/misViajes/ButtonMisViajes';
import ButtonNuevoViaje from '@/components/misViajes/ButtonNuevoViaje';
//import CardMisViajes from '@/components/misViajes/CardMisViajes';
import MisViajesCard from '@/components/misViajes/MisViajesCard';
import { Grid, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
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
    </div>
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

export default function MisViajes() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [viajesDelUsuario, setViajesDelUsuario] = useState([]);
  const [viajesInvidatos, setViajesInvitados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
        if (!usuario) {
          router.push('/login');
          return;
        }
        const viajesDelUsuario = await axios.get(`${URLRAILWAY}/api/v1/users/${usuario.idUser}`);
        if (viajesDelUsuario.status === 200) {
          setViajesDelUsuario(viajesDelUsuario.data.viajes);
          console.log(viajesDelUsuario.data.viajes, 'viajes del usuario');
          setLoading(false);
        }
        const viajesColaborativos = await axios.get(`${URLRAILWAY}/api/v1/colaboradores/search/${usuario.idUser}`);
        if (viajesColaborativos.status === 200) {
          setViajesInvitados(viajesColaborativos.data);
          console.log(viajesColaborativos.data, 'viajes JUNTOS');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, [router]);

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
      <ButtonNuevoViaje />
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '10px' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='Mis Viajes' {...a11yProps(0)} />
          <Tab label='Viajes Compartidos' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <h2>Mis Viajes</h2>
        <Grid sx={{ padding: '15px' }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {viajesDelUsuario.length > 0 ? (
            viajesDelUsuario.map((viajes) => (
              <Grid item xs={12} md={6} key={viajes._id}>
                <MisViajesCard datosViajes={viajes} />
              </Grid>
            ))
          ) : (
            <NoViajesMessage />
          )}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h2>Viajes Compartidos</h2>
        <Grid sx={{ padding: '15px' }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {viajesInvidatos.length > 0 ? (
            viajesInvidatos.map((viaje) => (
              <Grid item xs={12} md={6} key={viaje._id}>
                <h3>{`Viaje compartido por ${viaje.administradorViaje.name}`}</h3>
                <MisViajesCard datosViajes={viaje} />
              </Grid>
            ))
          ) : (
            <NoViajesMessage />
          )}
        </Grid>
      </TabPanel>
    </Box>
  );
}
