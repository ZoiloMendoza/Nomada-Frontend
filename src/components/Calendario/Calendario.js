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
  height: '65vh',
  width: '60vw',
  marginTop: '20px',
  backgroundColor: '#FFFFFF',
  borderRadius: '5px',
  boxShadow: theme.shadows[0],
  margin: '20px auto',
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
    height: '110%',
  };
  return {
    style,
  };
};

const Calendario = ({viajes}) => {
  const [events, setEvents] = useState([]);
  console.log(viajes, 'componente calendario')
  useEffect(() => {
    const formattedEvents = viajes ? viajes.map((event) => ({
      title: event.destino,
      start: new Date(event.fechaInicio),
      end: new Date(event.fechaFinal),
    })) : [];
    setEvents(formattedEvents);
  }, [viajes]);

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
            views={['month', 'day']}
            formats={customFormats}
          />
        </StyledCalendarContainer>
      </div>
    </ThemeProvider>
  );
};

export default Calendario;
