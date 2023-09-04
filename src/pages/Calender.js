import React from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarPage = () => {
  const events = [
    {
      title: 'Meeting Scheduled',
      start: '2023-08-18T14:15:00',
      end: '2023-08-18T14:45:00',
    },
    {
      title: 'Meeting Scheduled',
      start: '2023-08-28T17:15:00',
      end: '2023-08-28T17:45:00',
    },
    {
      title: 'Meeting Scheduled ',
      start: '2023-08-28T01:15:00',
      end: '2023-08-28T01:45:00',
    },
  ];

  const handleEventMouseEnter = (info) => {
    const tooltip = document.createElement('div');
    tooltip.className = 'event-tooltip';
    tooltip.innerHTML = 'The meeting is scheduled by xyz on 2.15';
    info.el.appendChild(tooltip);
  };

  const handleEventMouseLeave = () => {
    const tooltips = document.getElementsByClassName('event-tooltip');
    while (tooltips.length > 0) {
      tooltips[0].parentNode.removeChild(tooltips[0]);
    }
  };

  return (
    <>
     <div style={{ backgroundColor: 'black', height: '100vh' }}>
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: 'today prev,next',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          height="90vh"
          events={events}
          eventMouseEnter={handleEventMouseEnter}
          eventMouseLeave={handleEventMouseLeave}
        />
        </div>
  
    </>
  );
};

export default CalendarPage;
