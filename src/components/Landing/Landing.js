import React from 'react';
import HeroSection from './Hero';
import Steps from './Steps';

import Box from '@mui/material/Box';

const Landing = () => (
  <>
    <HeroSection />
    <Box
      sx={{
        margin: 5,
      }}
    >
      <Steps />
    </Box>
  </>
);

export default Landing;
