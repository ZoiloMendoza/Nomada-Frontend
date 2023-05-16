import NavbarTwo from '@/components/Navbar/NavbarTwo';
import Footer from '@/components/Footer/Footer';
import ButtonMisViajes from '@/components/misViajes/ButtonMisViajes';
import ButtonNuevoViaje from '@/components/misViajes/ButtonNuevoViaje';
//import CardMisViajes from '@/components/misViajes/CardMisViajes';
import MisViajesCard from '@/components/misViajes/MisViajesCard';
import { Box } from '@mui/material';

export default function Registro() {
  return (
    <>
      <NavbarTwo />
      <ButtonMisViajes />
      <ButtonNuevoViaje />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        |||
        <MisViajesCard />
      </Box>

      <Footer />
    </>
  );
}
