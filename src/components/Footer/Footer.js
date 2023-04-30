import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, IconButton } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#2B2E4A",
    color: "#fff",
    padding: theme.spacing(4),
  },
  iconButton: {
    color: "#fff",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#E91E63",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <p>Síguenos en nuestras Redes Sociales:</p>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container justifyContent="flex-end" alignItems="center">
              <IconButton
                className={classes.iconButton}
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                className={classes.iconButton}
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                className={classes.iconButton}
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener"
              >
                <InstagramIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
