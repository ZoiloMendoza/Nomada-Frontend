import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from '@material-ui/core';
import { Link } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    width: '100%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    backgroundColor: '#B8B8B8',
        border: 'none',
        color: '#FFFFFF',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        margin:  '10px',
        padding: '10px 20px',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        width: '100%;',
  },
  buttonTwo: {
    backgroundColor: '#E91E63',
        border: 'none',
        color: '#FFFFFF',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        margin:  '10px',
        padding: '10px 20px',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        width: '100%;',
  },
  group: {
    display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        
  }
}));

export default function Add() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        className={classes.group}
        orientation="vertical"
        color="primary"
        aria-label="vertical outlined primary button group"
      >
        <Link href="/page1">
          <Button 
          className={classes.button}>Nuevo destino</Button>
        </Link>
        <Link href="/page2">
          <Button className={classes.button}>Hospedaje</Button>
        </Link>
        <Link href="/page3">
          <Button className={classes.button}>Buscar actividades</Button>
        </Link>
        <Link href="/page4">
          <Button className={classes.buttonTwo}>Mapa</Button>
        </Link>
      </ButtonGroup>

    </div>
    
  );
}
