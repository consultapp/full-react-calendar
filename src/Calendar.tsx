import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import multiMonthPlugin from '@fullcalendar/multimonth'
import ruLocale from '@fullcalendar/core/locales/ru'

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[multiMonthPlugin, dayGridPlugin]}
      initialView={'multiMonthYear'}
      height="95vh"
      events={[
        { title: 'event 1', date: '2025-01-05' },
        { title: 'event 2', date: '2025-01-09' },
      ]}
      locale={ruLocale}
      customButtons={{
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!')
          },
        },
      }}
      headerToolbar={{
        start: 'prev today next',
        center: 'title',
        end: 'multiMonthYear dayGridMonth dayGridWeek dayGridDay',
      }}
      footerToolbar={{ start: 'prev today next', end: 'myCustomButton' }}
    />
  )
}
