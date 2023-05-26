import { styled } from '@mui/system';
import { Container, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const RootSection = styled('div')(({ theme }) => ({
  backgroundColor: '#2B2E4A',
  color: '#fff',
  padding: theme.spacing(4),
  position: 'relative',
  left: '0',
  bottom: '0',
  width: '100%',
  position: 'relative',
}));

const IconButtonIcon = styled(IconButton)(() => ({
  color: '#fff',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#E91E63',
  },
}));

const Footer = () => (
  <RootSection>
    <Container maxWidth='md'>
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item xs={12} md={6}>
          <p>Síguenos en nuestras Redes Sociales:</p>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container justifyContent='flex-end' alignItems='center'>
            <IconButtonIcon href='https://www.facebook.com' target='_blank' rel='noopener'>
              <FacebookIcon />
            </IconButtonIcon>
            <IconButtonIcon href='https://www.twitter.com' target='_blank' rel='noopener'>
              <TwitterIcon />
            </IconButtonIcon>
            <IconButtonIcon href='https://www.instagram.com' target='_blank' rel='noopener'>
              <InstagramIcon />
            </IconButtonIcon>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </RootSection>
);

export default Footer;
