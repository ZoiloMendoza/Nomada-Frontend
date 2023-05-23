import React, { useEffect, useState } from 'react';
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
  height: '310px',
  marginTop: '20px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  margin: '20px auto',
  overflow: 'hidden',
}));

const eventStyleGetter = () => {
  const backgroundColor = '#E91E63'; // Puedes cambiar esto al color de fondo que prefieras
  const textColor = '#ffffff'; // Puedes cambiar esto al color de texto que prefieras
  const style = {
    backgroundColor,
    color: textColor,
    borderRadius: '2px',
    opacity: 0.8,
    height: '110%',
  };
  return {
    style,
  };
};

const Calendario = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const apiExample = '/example.json';
    const fetchEventos = async () => {
      try {
        const response = await fetch(apiExample);
        console.log('Respuesta:', response);
        const data = await response.json();

        const formattedEvents = data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    };
    fetchEventos();
  }, []);

  return (
    <ThemeProvider theme={localTheme}>
      <div>
        <h1>Calendario de Actividades</h1>
        <StyledCalendarContainer>
          <Calendar
            selectable
            localizer={localizer}
            events={events}
            startAccessor='start'
            endAccessor='end'
            style={{ height: '100%', width: '100%' }}
            eventPropGetter={eventStyleGetter}
            views={['month']}
            formats={customFormats}
          />
        </StyledCalendarContainer>
      </div>
    </ThemeProvider>
  );
};

export default Calendario;
