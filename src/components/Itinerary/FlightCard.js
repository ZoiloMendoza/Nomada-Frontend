import { useState } from 'react';
import { Card, CardContent, CardHeader, Typography, Collapse, IconButton } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import FlightIcon from '@mui/icons-material/Flight';

import Grid from '@mui/material/Grid';

const styles = {
  card: {
    marginBottom: '10px',
    margin: 2,
    backgroundColor: '#F6F6F6',
    borderRight: '10px solid #2B2E4A',
  },
  expandIcon: {
    transform: 'rotate(0deg)',
    transition: 'ease 0.3s',
  },
  expandIconOpen: {
    transform: 'rotate(180deg)',
  },
};

const FlightCard = ({ flightData, handleEdit, handleDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //console.log(flightData, 'flightData');
  return (
    <>
      {flightData ? (
        <Card sx={styles.card}>
          <div sx={styles.editDeleteIcons}>
            <IconButton aria-label='edit' onClick={() => handleEdit(flightInfo)}>
              <EditIcon
                sx={{
                  width: '20px',
                  color: '#D2D2D2',
                }}
              />
            </IconButton>
            <IconButton aria-label='delete' onClick={() => handleDelete(flightInfo)}>
              <DeleteIcon
                sx={{
                  width: '20px',
                  color: '#D2D2D2',
                }}
              />
            </IconButton>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <CardHeader
                title={`${flightData?.origen} a ${flightData?.destino}`}
                subheader={`${flightData.fechaIda} | ${flightData?.airline}`}
              />
            </Grid>
            <Grid item xs={2}>
              <FlightIcon />
            </Grid>
          </Grid>
          <CardContent>
            <Typography variant='h6' component='p'>
              {`${flightData?.fechaIda} - ${flightData?.fechaRegreso}`}
            </Typography>
            <Typography variant='subtitle1' component='p'>
              {`duración: ${flightData?.duration} | escalas: ${flightData?.stops}`}
            </Typography>
          </CardContent>
          <IconButton
            className={`${styles.expandIcon} ${expanded ? styles.expandIconOpen : ''}`}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='mostrar más'
          >
            <ExpandMore />
          </IconButton>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent>
              <Typography variant='subtitle1' component='p'>
                {`Status: ${flightData?.status}`}
              </Typography>
              <Typography variant='subtitle1' component='p'>
                {`Número de vuelo: ${flightData?.numeroVuelo}`}
              </Typography>
              <Typography variant='subtitle1' component='p'>
                {`Terminal: ${flightData?.terminal}`}
              </Typography>
              <Typography variant='subtitle1' component='p'>
                {`Puerta: ${flightData?.gate}`}
              </Typography>
              <Typography variant='subtitle1' component='p'>
                {`Clase: ${flightData?.class}`}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ) : (
        'skeleton'
      )}
    </>
  );
};

export default FlightCard;
