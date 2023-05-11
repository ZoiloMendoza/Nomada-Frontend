import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const ButtonCustom = ({ text }) => {
  const customColor = '#E91E63';

  return (
    <Button
      href='/itinerary'
      variant='contained'
      style={{
        backgroundColor: customColor,
        borderRadius: '50px',
        padding: '10px 10px',
        width: '50%',
        textTransform: 'none',
      }}
    >
      <Typography variant='body1' sx={{ marginBottom: 0 }}>
        {text}
      </Typography>
    </Button>
  );
};

export default ButtonCustom;
