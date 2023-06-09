import { CircularProgress } from '@mui/material';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  spinner: {
    color: '#E91E63',
    animationDuration: '1.5s',
    marginRight: theme.spacing(1),
  },
  text: {
    color: '#E91E63',
    fontSize: '1.2rem',
  },
};

function Spinner() {
  return (
    <div sx={styles.root}>
      <CircularProgress className={classes.spinner} size={40} thickness={4} />
      <span className={classes.text}>Traveling...</span>
    </div>
  );
}

export default Spinner;
