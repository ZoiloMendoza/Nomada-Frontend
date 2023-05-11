import NavbarTwo from '@/components/Navbar/NavbarTwo';
import Footer from '@/components/Footer/Footer';
import CrearViaje from '@/components/BoxCrearViaje/CrearViaje';
import MisViajes from '@/components/BoxCrearViaje/MisViajes';
import { Box } from '@mui/material';

export default function Registro() {
  return (
    <>
      <NavbarTwo />

      <Box>
        <CrearViaje />
        <MisViajes />
      </Box>

      <Footer />
    </>
  );
}
