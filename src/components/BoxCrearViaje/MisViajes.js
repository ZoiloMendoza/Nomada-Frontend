import { Card, Box, CardMedia, CardContent, Typography } from '@mui/material';

function BasicCard() {
  const customColor = '#6C6D7F';
  const customColor2 = '#E91E63';
  const customColor3 = '#FFFFFF';

  return (
    <Box component='ul' sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
      <Card component='li' sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardMedia>
          <img
            src='https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800'
            srcSet='https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x'
            loading='lazy'
            alt=''
          />
        </CardMedia>
        <CardContent>
          <Typography level='h6' fontWeight='lg' textColor='#fff' mt={{ xs: 12, sm: 18 }}>
            Image
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
export default BasicCard;
