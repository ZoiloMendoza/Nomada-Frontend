import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import PeopleIcon from '@mui/icons-material/People';
import { Favorite } from '@mui/icons-material';
import AddToGroup from './AddToGroup';
import { useState } from 'react';
//import { Tooltip } from '@mui/material';

const CircleIconButton = ({ icon, href, onClick }) => (
  <IconButton
    style={{
      backgroundColor: '#E91E63',
      color: '#FFFFFF',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      margin: '20px 5px',
    }}
    component='a'
    href={href}
    onClick={onClick}
  >
    {icon}
  </IconButton>
);

const styles = {
  hero: {
    backgroundImage: 'url("background1.jpg")',
    position: 'relative',
    width: '100%',
    height: '300px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    /*[theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 56px)',
    }, */
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    color: '#fff',
    padding: '20px',
  },

  heroText: {
    textAlign: 'left',

    //marginBottom: '10px',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    //marginBottom: '10px',
    //textShadow: '2px 2px 1px gray',
    /* [theme.breakpoints.down('sm')]: {
      fontSize: '2.5rem',
    }, */
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    //textShadow: '2px 2px 1px gray',
    /*  [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    }, */
  },
  heroButton: {
    marginTop: '10px',

    /* [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    }, */
  },
};

const HeroImage = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  /*
  const destino = () => {
    console.log('click boton add');
    router.push({
      pathname: '/add',
      query: { destino: viajeData?.destino, paisDestino: viajeData?.paisDestino, idRuta: viajeData?.rutas[0]?._id },
    });
  }; */

  const handleOpenModal = () => {
    setOpenModal(true);
    console.log('Add to Group clicked!');
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {openModal && <AddToGroup viajeData={props.viajeData} openModal={openModal} closeModal={closeModal} />}
      <Box sx={{ ...styles.hero, backgroundImage: `url(${props.imagenFondo})` }}>
        <Container maxWidth={false} sx={styles.overlay}>
          <Container maxWidth={'lg'}>
            <div sx={styles.heroText}>
              <Typography variant='h1' sx={styles.heroTitle}>
                {props.viajeData?.nombre}
              </Typography>
              <Typography variant='h2' sx={styles.heroSubtitle}>
                {`${props.viajeData?.destino}`.split(',')[0]} {` - ${props.viajeData?.fechaInicio}`}
              </Typography>
              <Link href={`/calendario?id=${id}`}>
                <Button variant='contained' color='secondary' sx={styles.heroButton}>
                  Calendario
                </Button>
              </Link>
              <div>
                <CircleIconButton icon={<Favorite />} href='/favorites' />

                <CircleIconButton icon={<PeopleIcon />} onClick={handleOpenModal} />
              </div>
            </div>
          </Container>
        </Container>
      </Box>
    </>
  );
};

export default HeroImage;
