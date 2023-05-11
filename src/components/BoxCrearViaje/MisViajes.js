import { Card, Box, Button } from '@mui/material';
import Link from 'next/link';

function MisViajes() {
  const customColor = '#2B2E4A';
  //const customColor2 = '#E91E63';
  //const customColor3 = '#FFFFFF';

  return (
    <Card bgcolor='gray' variant='soft' sx={{ backgroundColor: "'#BABCBE'", minWidth: '100px', width: '300px' }}>
      <Box my={4} ml={7} justifyContent='center' direction='row' bgcolor='gray' container>
        <Link legacyBehavior href='/misviajes'>
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
        </Link>
      </Box>
    </Card>
  );
}
export default MisViajes;
