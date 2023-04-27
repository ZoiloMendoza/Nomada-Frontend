import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Typography } from '@material-ui/core';

import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import GetAppIcon from '@mui/icons-material/GetApp';
import ShareIcon from '@mui/icons-material/Share';
import PeopleIcon from '@mui/icons-material/People';
import { Favorite } from '@material-ui/icons';

const CircleIconButton = ({ icon, href }) => (
  <IconButton
    style={{
      backgroundColor: '#E91E63',
      color: '#FFFFFF',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      margin: '20px 0',
    }}
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </IconButton>
);

const useStyles = makeStyles((theme) => ({

  hero: {
    backgroundImage: `url('https://prod-be-palace-brand.s3.amazonaws.com/pb_Mod_Dest_hero_3600x1800_CANCUN_b4996f5d6d.jpg')`,
    height: 'calc(50vh - 64px)',
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

const HeroImage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.hero}>
      <Container maxWidth="md">

      <Grid container spacing={2}>
      <Grid item>
        <IconButton component="a" href="/download">
          <GetAppIcon sx={{ color: '#FFFFFF' }} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton component="a" href="/share">
          <ShareIcon sx={{ color: '#FFFFFF' }} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton component="a" href="/users">
          <PeopleIcon sx={{ color: '#FFFFFF' }} />
        </IconButton>
      </Grid>
    </Grid>
        
        <div className={classes.heroText}>
          <Typography variant="h1" className={classes.heroTitle}>
            NombreViaje
          </Typography>
          <Typography variant="h2" className={classes.heroSubtitle}>
            Destino y fecha
          </Typography>
          <Button variant="contained" color="secondary" className={classes.heroButton}>
            Calendario
          </Button>
          <div>
            <CircleIconButton
              icon={<Favorite />}
              href="/favorite"
            />
          </div>
        </div>  
          

         

      </Container>
    </Box>
  );
};

export default HeroImage;
