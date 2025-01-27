import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import multiMonthPlugin from '@fullcalendar/multimonth'
import ruLocale from '@fullcalendar/core/locales/ru'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'

let calendarApi: ReturnType<FullCalendar['getApi']> | undefined

type CEvent = {
  title: string
  date: string
}

export default function Calendar() {
  const calendarRef = useRef<FullCalendar>(null)
  const [events, setEvents] = useState<CEvent[]>()

  console.log('events', events)

  const fetchEvents = async (start: string, end: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/events?start_gte=${start}&start_lte=${end}`
      )
      setEvents(await response.json())
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const handleDatesSet = (data: { start: Date; end: Date }) => {
    const { start, end } = data
    console.log('handleDatesChange:', start, end)
    fetchEvents(start.toISOString(), end.toISOString())
  }

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
      initialView={'multiMonthYear'}
      height="95vh"
      events={events}
      locale={ruLocale}
      customButtons={customButtons}
      headerToolbar={headerToolbar}
      footerToolbar={footerToolbar}
      dateClick={dateClickHandler}
      datesSet={handleDatesSet}
    />
  )
}
