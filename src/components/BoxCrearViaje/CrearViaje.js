import { Card, Typography, Input, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function CrearViaje() {
  const customColor2 = '#E91E63';

  return (
    <Card
      bgcolor='gray'
      variant='soft'
      sx={{
        backgroundColor: '#BABCBE',
        minHeight: '100px',
        width: '300px',
      }}
    >
      <Typography
        level='h3'
        mt={3}
        flexDirection='column'
        alignItems='center'
        textAlign='center'
        justifyContent='center'
        sx={{ display: 'flex', fontFamily: 'Inter, sans-serif', fontSize: '25px', fontWeight: 'bold' }}
      >
        {' '}
        Comienza por crear un viaje aquí abajo.
      </Typography>
      <Typography
        level='body2'
        flexDirection='column'
        alignItems='center'
        textAlign='center'
        justifyContent='center'
        sx={{ display: 'flex', fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 'light' }}
      >
        Nombre del Viaje
      </Typography>
      <Box mt={2} mb={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Input
          sx={{ padding: '10px', borderRadius: '5px', backgroundColor: '#fff', width: '250px', margin: 'auto' }}
          placeholder='Mi viaje ideal'
          variant='soft'
        />
      </Box>
      <Box my={4} ml={7} justifyContent='center' direction='row' container>
        <Link href='/crear-viaje'>
          <Button
            variant='contained'
            style={{
              fontSize: '15px',
              backgroundColor: customColor2,
              borderRadius: '40px',
              padding: '15px 40px',
              textTransform: 'none',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            CREAR VIAJE
          </Button>
        </Link>
      </Box>
    </Card>
  );
}
