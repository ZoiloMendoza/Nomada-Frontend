import React from 'react';
import Hero from './Hero';
import Steps from './Steps';

import Box from '@mui/material/Box';

const Landing = () => (
  <>
    <Hero />
    <Box
      sx={{
        margin: '10vh',
        height: '100%',
      }}
    >
      <Steps />
    </Box>
  </>
);

export default Landing;
