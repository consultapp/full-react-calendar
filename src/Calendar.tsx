import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import multiMonthPlugin from '@fullcalendar/multimonth'
import ruLocale from '@fullcalendar/core/locales/ru'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'

let calendarApi: ReturnType<FullCalendar['getApi']> | undefined

export default function Calendar() {
  const calendarRef = useRef<FullCalendar>(null)

  const dateClickHandler = useCallback((info: DateClickArg) => {
    if (calendarApi) {
      const currentView = calendarApi.view.type
      let nextView = ''
      if (currentView === 'multiMonthYear') {
        nextView = 'dayGridMonth'
      } else if (currentView === 'dayGridMonth') {
        nextView = 'dayGridWeek'
      } else if (currentView === 'dayGridWeek') {
        nextView = 'dayGridDay'
      } else {
        nextView = 'dayGridDay'
      }

      calendarApi.changeView(nextView, info.date)
      console.log('Date click:', info.dateStr, info.view.type)
    }
  }, [])

  const customButtons = useMemo(
    () => ({
      myCustomButton: {
        text: 'custom!',
        click: function () {
          alert('clicked the custom button!')
        },
      },
    }),
    []
  )
  const headerToolbar = useMemo(
    () => ({
      start: 'prev today next',
      center: 'title',
      end: 'multiMonthYear dayGridMonth dayGridWeek dayGridDay',
    }),
    []
  )
  const footerToolbar = useMemo(
    () => ({ start: 'prev today next', end: 'myCustomButton' }),
    []
  )

  useEffect(() => {
    calendarApi = calendarRef?.current?.getApi()
  }, [calendarRef])

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[multiMonthPlugin, dayGridPlugin, interactionPlugin]}
      initialView="multiMonthYear"
      height="95vh"
      events={[
        { title: 'event 1', date: '2025-01-05' },
        { title: 'event 2', date: '2025-01-09' },
      ]}
      locale={ruLocale}
      customButtons={customButtons}
      headerToolbar={headerToolbar}
      footerToolbar={footerToolbar}
      dateClick={dateClickHandler}
    />
  )
}
