import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function BasicCard() {
  const customColor = '#2B2E4A';
  const customColor2 = '#E91E63';
  const customColor3 = '#FFFFFF';

  return (
    <Card bgcolor='gray' variant='soft' sx={{ backgroundColor: "'#BABCBE'", minWidth: '100px', width: '300px' }}>
      <CardMedia>
        <img
          src='https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800'
          srcSet='https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x'
          loading='lazy'
          alt=''
        />
      </CardMedia>
      <Box my={4} ml={7} justifyContent='center' direction='row' bgcolor='gray' container>
        <Button
          variant='contained'
          style={{
            fontSize: '15px',
            backgroundColor: customColor,
            borderRadius: '40px',
            padding: '15px 40px',
            textTransform: 'none',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          CREAR VIAJE
        </Button>
      </Box>
    </Card>
  );
}
export default BasicCard;
