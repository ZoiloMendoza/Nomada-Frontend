import { Box, Button } from '@mui/material';
import ImagesCompartirViaje from './ImagesCompartirViaje';

export default function CompartirViaje() {
  const customColor = '#6C6D7F';
  const customColor2 = '#E91E63';
  const customColor3 = '#FFFFFF';

  return (
    <div>
      <Box color={'black'} bgcolor={customColor3} p={15}>
        {' '}
        ... te ha compartido el viaje " "
      </Box>
      <Box color={customColor3} bgcolor={customColor} p={15}>
        {' '}
        Ahora podrás planear y organizar tu viaje sin perderte ni un sólo detalle. ¡Todo en un sólo lugar!
        <Button
          variant='contained'
          style={{
            backgroundColor: customColor2,
            borderRadius: '10px',
            padding: '10px px',
            textTransform: 'none',
          }}
        >
          {' '}
          Ver viaje
        </Button>
      </Box>
      <Box color={'black'} bgcolor={customColor3} p={15}>
        {' '}
        Checa más actividades para hacer en "Bélgica"
      </Box>
      <ImagesCompartirViaje />
    </div>
  );
}
