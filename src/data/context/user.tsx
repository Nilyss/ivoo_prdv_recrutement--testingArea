// hooks
import { createContext, useState } from 'react'

// Models
import { User } from '../API/models/User.ts'

// API
import CalendarService from '../API/services/CalendarService.ts'

const calendarService: CalendarService = new CalendarService()

// Types
type UserDataContextType = {
  user: User | null
  isDateAlreadyBooked: boolean
  setIsDateAlreadyBooked

  getUser: (userId: string) => Promise<void>
}

// init context
export const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
)

export const UserDataProvider = ({ children }) => {
  // state
  const [user, setUser] = useState<User | null>(null)
  const [isDateAlreadyBooked, setIsDateAlreadyBooked] = useState<boolean>(false)

  const getUser = async (userId: string): Promise<void> => {
    if (!user) {
      const requestingCal: { fn: string; smsUID: string; debug: string } = {
        fn: 'getData',
        smsUID: userId,
        debug: 'false',
      }

      const res = await calendarService.getBookedTimeSlotCalendar(requestingCal)

      const fetchedUser: User = res.user
      const connectedUser: boolean = fetchedUser.uid === userId

      if (connectedUser) {
        setUser(fetchedUser)
        if (fetchedUser.date.length > 0 && fetchedUser.hour.length > 0) {
          setIsDateAlreadyBooked(true)
        }
      }
    }
  }

  return (
    <UserDataContext.Provider
      value={{
        user,
        getUser,
        isDateAlreadyBooked,
        setIsDateAlreadyBooked,
      }}
    >
      {children}
    </UserDataContext.Provider>
  )
}
