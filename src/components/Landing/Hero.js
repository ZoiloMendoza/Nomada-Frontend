import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `url('https://youmatter.world/app/uploads/sites/2/2019/11/travel-world.jpg')`,
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
  },
  heroText: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
    },
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
  heroButton: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
}));

const Hero = () => {
  const classes = useStyles();

  return (
    <Box className={classes.hero}>
      <Container maxWidth="md">
        <div className={classes.heroText}>
          <Typography variant="h1" className={classes.heroTitle}>
            Planea El Viaje De Tus Sueños
          </Typography>
          <Typography variant="h2" className={classes.heroSubtitle}>
            Déjanos ayudarte a llevar al máximo tu próxima aventura
          </Typography>
          <Button variant="contained" color="secondary" className={classes.heroButton}>
            Regístrate
          </Button>
        </div>
      </Container>
    </Box>
  );
};

export default Hero;
