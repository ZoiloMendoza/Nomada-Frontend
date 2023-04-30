import React from 'react';
import Hero from './Hero';
import Steps from './Steps';

import Box from '@material-ui/core/Box';

const Landing = () => (
  <>
    <Hero />
    <Box
      style={{
        margin: 5,
      }}
    >
      <Steps />
    </Box>
  </>
);

export default Landing;
