// hooks
import { createContext, useState } from 'react'

// Models
import { BookedTimeSlotCalendar } from '../API/models/BookedTimeSlotCalendar.ts'

// API
import CalendarService from '../API/services/CalendarService.ts'

const calendarService: CalendarService = new CalendarService()

// Types
type CalendarDataContextType = {
  bookedDates: BookedTimeSlotCalendar[] | null

  getBookedDates: (userId: string) => Promise<void>
}

// init context
export const CalendarDataContext = createContext<
  CalendarDataContextType | undefined
>(undefined)

export const CalendarDataProvider = ({ children }) => {
  // state
  const [bookedDates, setBookedDates] = useState<
    BookedTimeSlotCalendar[] | null
  >(null)

  const getBookedDates = async (userId: string): Promise<void> => {
    if (!bookedDates) {
      const requestingCal: { fn: string; smsUID: string; debug: string } = {
        fn: 'getData',
        smsUID: userId,
        debug: 'false',
      }

      const res = await calendarService.getBookedTimeSlotCalendar(requestingCal)

      const fetchedCalendar: BookedTimeSlotCalendar[] =
        res.bookedTimeSlotCalendar

      setBookedDates(fetchedCalendar)
    }
  }

  return (
    <CalendarDataContext.Provider
      value={{
        bookedDates,
        getBookedDates,
      }}
    >
      {children}
    </CalendarDataContext.Provider>
  )
}
