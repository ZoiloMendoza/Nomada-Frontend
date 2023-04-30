import { Grid, Typography } from '@material-ui/core';
import Image from 'next/image';

const Step = ({ title, description, image }) => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Typography variant='body1'>{description}</Typography>
    </Grid>
    <Grid item xs={12} md={6}>
      <Image src={image} width={300} height={300} alt={title} />
    </Grid>
  </Grid>
);

const Steps = () => (
  <Grid container spacing={4}>
    <Grid item xs={12}>
      <Typography variant='h4' align='center' gutterBottom>
        Cómo Funciona
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Step
        title='Crea o ingresa a tu cuenta'
        description='Crea una cuenta para comenzar a hacer tus propios itinerarios. Puedes registrarte con tu cuenta de correo o a través de tu cuenta de Facebook o Google.'
        image='/img/ill-0.svg'
      />
    </Grid>
    <Grid item xs={12}>
      <Step
        title='Selecciona tu primer destino'
        description='Elige las ciudades a las que viajarás y descubre qué puedes hacer, dónde comer y más.'
        image='/img/ill-5.svg'
      />
    </Grid>
    <Grid item xs={12}>
      <Step
        title='Elige las fechas en las que viajarás'
        description='Selecciona las fechas en las que viajarás y te sugeriremos actividades disponibles  durante tu viaje.'
        image='/img/ill-4.svg'
      />
    </Grid>
    <Grid item xs={12}>
      <Step
        title='Escoge actividades y agrégalas a tu itinerario'
        description='Selecciona las actividades que quieres hacer y agrégalas a tu itinerario. Puedes personalizar el orden y la duración de cada actividad.'
        image='/img/ill-1.svg'
      />
    </Grid>
    <Grid item xs={12}>
      <Step
        title='Descarga, comparte o imprime tu itinerario'
        description='Cuando estés list@, descarga, imprime o comparte tu itinerario con tus acompañantes, y llévalo contigo en tu viaje.'
        image='/img/ill-6.svg'
      />
    </Grid>
  </Grid>
);

export default Steps;
