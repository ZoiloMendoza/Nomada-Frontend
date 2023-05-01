import React from 'react';
import { styled } from '@mui/system';
import { Box, Button, Container, Typography } from '@mui/material';

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: `url('https://www.parisperfect.com/g/photos/upload/sml_584260314-1501857542-travel-plane-large.jpg')`,
  height: 'calc(100vh - 64px)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  [theme.breakpoints.down('sm')]: {
    height: 'calc(100vh - 56px)',
  },
}));

const HeroText = styled('div')(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const HeroButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(2),
  },
}));

const Hero = () => (
  <HeroSection>
    <Container maxWidth='md'>
      <HeroText>
        <HeroTitle variant='h1'>Planea El Viaje De Tus Sueños</HeroTitle>
        <HeroSubtitle variant='h2'>Déjanos ayudarte a llevar al máximo tu próxima aventura</HeroSubtitle>
        <HeroButton variant='contained' color='secondary'>
          Regístrate
        </HeroButton>
      </HeroText>
    </Container>
  </HeroSection>
);

export default Hero;
