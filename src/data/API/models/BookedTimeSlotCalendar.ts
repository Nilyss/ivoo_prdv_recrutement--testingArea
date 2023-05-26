// Define the Calendar type
export type BookedTimeSlotCalendar = {
  date: string
  hour: string
}

// Then define the factory function to create a Calendar
export const createBookedTimeSlotCalendar = (
  date: string,
  hour: string
): BookedTimeSlotCalendar => {
  return {
    date,
    hour,
  }
}
