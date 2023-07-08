import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useUserContext } from '@/context/userLogin';
import { useAuth } from '@/utils/useAuth';
import ButtonNuevoViaje from '@/components/misViajes/ButtonNuevoViaje';
import { SkeletonMisViajes } from '@/components/SkeletonsCards/SkeletonMisViajes';


const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

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

const DynamicMisViajesCard = dynamic(() => import('@/components/misViajes/MisViajesCard'), {
  loading: () => (
    <div>
      <SkeletonMisViajes />
    </div>
  ),
});

export default function MisViajes() {
  const { variableState } = useUserContext();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viajesDelUsuario, setViajesDelUsuario] = useState([]);
  const [viajesInvidatos, setViajesInvitados] = useState([]);
  const [eliminado, setEliminado] = useState(null);
  useAuth();
  const usuario = variableState?.idUser;
  console.log('cuantas veces me renderizo ++')
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const obtencionViajesDelUsuario = async () => {
      try {
        const viajesDelUsuario = await axios.get(`${URLRAILWAY}/api/v1/users/${usuario}`);
        if (viajesDelUsuario.status === 200) {
          setViajesDelUsuario(viajesDelUsuario.data.viajes);
          console.log(viajesDelUsuario.data.viajes, 'viajes del usuario');
          setLoading(false);
        }
        const viajesColaborativos = await axios.get(`${URLRAILWAY}/api/v1/colaboradores/search/${usuario}`);
        if (viajesColaborativos.status === 200) {
          setViajesInvitados(viajesColaborativos.data);
          console.log(viajesColaborativos, 'viajes invitado');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    if (usuario) {
      obtencionViajesDelUsuario();
    }
  }, [usuario]);

  useEffect(() => {
    if (viajesDelUsuario.length > 0 && eliminado !== null) {
      console.log(eliminado, 'me estoy ejecutando');
      setViajesDelUsuario(viajesDelUsuario.filter((viaje) => viaje._id !== eliminado));
      setEliminado(null);
    }
  }, [eliminado]);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', padding: '5px', backgroundColor: '#EAEDED' }}>
      <ButtonNuevoViaje />
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '10px' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label={`Mis Viajes (${viajesDelUsuario.length || 0 })`} {...a11yProps(0)} />
          {viajesInvidatos.length === 0 ? null : <Tab label={`Viajes Compartidos (${viajesInvidatos.length})`} {...a11yProps(1)} />}
        </Tabs>
      </Box>
      {viajesDelUsuario?.length > 0 && (
        <TabPanel value={value} index={0}>
          <Grid sx={{ padding: '15px' }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {viajesDelUsuario.map((viaje) => (
              <Grid item xs={12} md={6} key={viaje._id}>
                <DynamicMisViajesCard datosViaje={viaje} setEliminado={setEliminado} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      )}
      {viajesInvidatos?.length > 0 && (
        <TabPanel value={value} index={1}>
          <Grid sx={{ padding: '15px' }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {viajesInvidatos.map((viaje) => (
              <Grid item xs={12} md={6} key={viaje._id}>
                <Box>
                  <h3>{`Viaje compartido por ${viaje.administradorViaje.name}`}</h3>
                </Box>
                <DynamicMisViajesCard datosViaje={viaje} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      )}
      {!loading && viajesDelUsuario?.length === 0 && <NoViajesMessage />}
    </Box>
  );
}
