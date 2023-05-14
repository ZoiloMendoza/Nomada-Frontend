import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const ButtonCustom = ({ text, onClick }) => (
  // const customColor = '#E91E63';

  <Button
  //  href='/itinerary'
    variant='contained'
    style={{
      backgroundColor: 'red',
      borderRadius: '50px',
      padding: '10px 10px',
      width: '50%',
      textTransform: 'none',
    }}
    onClick={() => onClick()}
  >
    <Typography variant='body1' sx={{ marginBottom: 0 }}>
      {text}
    </Typography>
  </Button>
);
export default ButtonCustom;
