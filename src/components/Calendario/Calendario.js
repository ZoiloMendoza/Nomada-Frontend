import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

moment.locale('es');

const localizer = momentLocalizer(moment);

const customFormats = {
  dayHeaderFormat: (date, culture, localizer) => localizer.format(date, 'dd', culture),
};

const localTheme = createTheme();

const StyledCalendarContainer = styled('div')(({ theme }) => ({
  height: '75vh',
  width: '75vw',
  backgroundColor: '#FFFFFF',
  borderRadius: '5px',
  boxShadow: theme.shadows[0],
  margin: '10px auto',
  overflow: 'hidden',
}));

const eventStyleGetter = () => {
  const backgroundColor = '#E91E63'; 
  const textColor = '#ffffff';
  const style = {
    backgroundColor,
    color: textColor,
    borderRadius: '2px',
    opacity: 0.8,
    height: '100%',
  };
  return {
    style,
  };
};

const Calendario = ({viajes, actividades}) => {

  const [events, setEvents] = useState([]);
  console.log(viajes, 'componente calendario')

  useEffect(() => {
    const formattedEvents = actividades ? actividades.map((event) => ({
      title: `${event.nombre},${event.direccion}`,
      start: new Date(event.fechaInicio),
      end: new Date(event.fechaInicio),
      imageUrl: event.fotos
    })) : [];
    setEvents(formattedEvents);
    console.log(formattedEvents, 'hay imagen?')
  }, [actividades]);
  console.log(actividades, 'rutas de cada viaje');
  
  return (
    <ThemeProvider theme={localTheme}>
      <>
       
        <StyledCalendarContainer>
          <Calendar
            selectable
            localizer={localizer}
            events={events}
            startAccessor='start'
            endAccessor='end'
            style={{ height: '100%', width: '100%' }}
            eventPropGetter={eventStyleGetter}
            views={['month', 'day']}
            formats={customFormats}
          />
        </StyledCalendarContainer>
      </>
    </ThemeProvider>
  );
};

export default Calendario;
