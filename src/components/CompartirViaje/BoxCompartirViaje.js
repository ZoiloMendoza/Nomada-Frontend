import { Box, Button, Grid } from '@mui/material';
import ImagesCompartirViaje from './ImagesCompartirViaje';

export default function CompartirViaje() {
  const customColor = '#6C6D7F';
  const customColor2 = '#E91E63';
  const customColor3 = '#FFFFFF';

  return (
    <div>
      <Grid>
        <Box
          color={'black'}
          bgcolor={customColor3}
          display='flex'
          alignItems='center'
          justifyContent='center'
          p={15}
          sx={{ fontFamily: 'Inter, sans-serif', fontSize: '25px', fontWeight: 'bold' }}
        >
          {' '}
          Paola te ha compartido a el viaje "Navidad en Bélgica"
        </Box>
        <Box
          color={customColor3}
          bgcolor={customColor}
          display='flex'
          flexDirection='column'
          textAlign='center'
          alignItems='center'
          justifyContent='center'
          p={15}
          sx={{ fontFamily: 'Inter, sans-serif', fontSize: '25px', fontWeight: 'bold' }}
        >
          {' '}
          Ahora podrás planear y organizar tu viaje sin perderte ni un sólo detalle. ¡Todo en un sólo lugar!
          <Grid my={4} justifyContent='center' direction='row' container>
            <Button
              variant='contained'
              style={{
                width: '300px',
                backgroundColor: customColor2,
                borderRadius: '10px',
                padding: '10px 10px',
                textTransform: 'none',
                fontSize: '20px',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {' '}
              Ver viaje
            </Button>
          </Grid>
        </Box>
        <Box
          color={'black'}
          bgcolor={customColor3}
          display='flex'
          flexDirection='column'
          textAlign='center'
          alignItems='center'
          justifyContent='center'
          p={15}
          sx={{ fontFamily: 'Inter, sans-serif', fontSize: '25px', fontWeight: 'bold' }}
        >
          {' '}
          Checa más actividades para hacer en Bélgica
        </Box>
        <ImagesCompartirViaje />
      </Grid>
    </div>
  );
}
