import { Card, Input, Box, CardMedia, Button } from '@mui/material';

export default function ImgMediaCard() {
  const customColor = '#2B2E4A';
  const customColor2 = '#E91E63';
  const customColor3 = '#FFFFFF';

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
      <Card bgcolor='gray' sx={{ maxWidth: 345 }}>
        <CardMedia
          component='img'
          bgcolor='gray'
          alt='green iguana'
          height='140'
          image='/static/images/cards/contemplative-reptile.jpg'
        />

        <Box  my={4} ml={7} justifyContent='center' direction='row' container>
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
            MIS VIAJES
          </Button>
        </Box>
      </Card>
    </Card>
  );
}
