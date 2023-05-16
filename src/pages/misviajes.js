//import ButtonMisViajes from '@/components/misViajes/ButtonMisViajes';
import ButtonNuevoViaje from '@/components/misViajes/ButtonNuevoViaje';
//import CardMisViajes from '@/components/misViajes/CardMisViajes';
import MisViajesCard from '@/components/misViajes/MisViajesCard';
import { Grid, Box } from '@mui/material';

export default function Registro() {
  return (
    <Box sx={{ width: '100%', height: '100%', padding: '5px' }}>
      <ButtonNuevoViaje />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={12} md={6} key={index}>
            <MisViajesCard />
          </Grid>
        ))}
        ;
      </Grid>
    </Box>
  );
}
