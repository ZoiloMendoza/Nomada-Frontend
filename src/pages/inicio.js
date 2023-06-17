import CrearViaje from '@/components/BoxCrearViaje/CrearViaje';
import MisViajes from '@/components/BoxCrearViaje/MisViajes';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
  },
};

export default function Inicio() {
  const router = useRouter();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    console.log(localStorage);

    if (!usuario) {
      router.push('/login');
    }
  }, [router]);
  return (
    <>
      <Box sx={styles.root}>
        <CrearViaje />
        <MisViajes />
      </Box>
    </>
  );
}
