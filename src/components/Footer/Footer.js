import { Container, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const styles = {
  root: {
    backgroundColor: '#2B2E4A',
    color: '#fff',
    padding: '10px',
  },
  iconButton: {
    color: '#fff',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#E91E63',
    },
  },
};

const Footer = () => (
  <div sx={styles.root}>
    <Container maxWidth='md'>
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item xs={12} md={6}>
          <p>Síguenos en nuestras Redes Sociales:</p>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container justifyContent='flex-end' alignItems='center'>
            <IconButton sx={styles.iconButton} href='https://www.facebook.com' target='_blank' rel='noopener'>
              <FacebookIcon />
            </IconButton>
            <IconButton sx={styles.iconButton} href='https://www.twitter.com' target='_blank' rel='noopener'>
              <TwitterIcon />
            </IconButton>
            <IconButton sx={styles.iconButton} href='https://www.instagram.com' target='_blank' rel='noopener'>
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </div>
);

export default Footer;
