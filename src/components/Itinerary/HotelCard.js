import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Collapse } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ExpandMore } from '@mui/icons-material';
import HotelIcon from '@mui/icons-material/Hotel';

import Grid from '@mui/material/Grid';

const styles = {
  card: {
    marginBottom: '5px',
    margin: 2,
    backgroundColor: '#FFFFFF',
    border: '1px solid #E91E63',
  },
  media: {
    maxHeight: 300,
    paddingTop: '56.25%', // 16:9
  },
  expandIcon: {
    transform: 'rotate(0deg)',
    transition: 'ease 0.3s',
  },
  expandIconOpen: {
    transform: 'rotate(180deg)',
  },
};

const HotelCard = ({ hotelData, handleEdit, handleDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {hotelData
        ? hotelData.map((hotelData, index) => (
            <Card sx={styles.card} key={index}>
              <CardContent>
                <div>
                  <IconButton aria-label='edit' onClick={() => handleEdit(hotelInfo)}>
                    <EditIcon
                      sx={{
                        width: '20px',
                        color: '#D2D2D2',
                      }}
                    />
                  </IconButton>
                  <IconButton aria-label='delete' onClick={() => handleDelete(hotelInfo)}>
                    <DeleteIcon
                      sx={{
                        width: '20px',
                        color: '#D2D2D2',
                      }}
                    />
                  </IconButton>
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <CardMedia sx={styles.media} image={hotelData?.image} title={hotelData.nombreHospedaje} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='h5'>{hotelData?.name}</Typography>
                    <Typography variant='subtitle1'>{hotelData?.direccion}</Typography>
                    <Typography variant='body1'>Check-in: {hotelData?.fechaInicio}</Typography>
                    <Typography variant='body1'>Check-out: {hotelData?.fechaFinal}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <HotelIcon />
                  </Grid>
                </Grid>

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
                    <Typography variant='h6'>Precio Total: ${hotelData?.totalPrice}</Typography>
                    <Typography variant='h6'>Número de reservación:</Typography>
                    <Typography variant='body1'>{hotelData?.reservation}</Typography>
                  </CardContent>
                </Collapse>
              </CardContent>
            </Card>
          ))
        : 'No hay Hoteles'}
    </>
  );
};

export default HotelCard;
