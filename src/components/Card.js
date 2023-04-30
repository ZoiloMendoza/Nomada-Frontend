import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ButtonAdd from './common/ButtonAdd';

const MyCard = () => (
  <Card>
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            marginRight: '16px',
          }}
        >
          <Typography variant='subtitle1' component='div'>
            Número de vuelo
          </Typography>
          <TextField label='' variant='outlined' />

          <Typography variant='subtitle1' component='div'>
            Ruta
          </Typography>
          <TextField label='' variant='outlined' />

          <Typography variant='subtitle1' component='div'>
            Fechas
          </Typography>
          <TextField label='' variant='outlined' />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ButtonAdd />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default MyCard;
