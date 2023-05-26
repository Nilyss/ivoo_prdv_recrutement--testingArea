import { formatApiBookedDate, formatApiDate } from '../../../utils/date.ts'
import {
  BookedTimeSlotCalendar,
  createBookedTimeSlotCalendar,
} from '../models/BookedTimeSlotCalendar.ts'
import { createUser, User } from '../models/User.ts'
import ApiCalls from '../controllers/ApiCall'

const apiCalls: ApiCalls = new ApiCalls()

export default class CalendarService {
  calMockupEndpoint = '/cal.json'
  calApiEndpoint = '/cal.php'
  rdvMockupEndpoint = '/rdv.json'
  rdvApiEndpoint = '/rdv.php'

  async getBookedTimeSlotCalendar(requestingCal): Promise<{
    bookedTimeSlotCalendar: BookedTimeSlotCalendar[]
    user: User
  }> {
    const requestData: [
      {
        valid: boolean
        uid: string
        token: string
        rdv: string
        blocked: string[]
      }
    ] = await apiCalls.postRequest(this.calMockupEndpoint, requestingCal)

    const bookedTimeSlotCalendar: BookedTimeSlotCalendar[] =
      requestData[0].blocked.map((data: string) =>
        createBookedTimeSlotCalendar(
          formatApiBookedDate(data).date,
          formatApiBookedDate(data).hour
        )
      )

    const userDate: string = formatApiBookedDate(requestData[0].rdv).date
    const userHour: string = formatApiBookedDate(requestData[0].rdv).hour
    const user: User = createUser(
      requestData[0].uid,
      requestData[0].token,
      userDate,
      userHour,
      requestData[0].valid
    )

    return { bookedTimeSlotCalendar, user }
  }

  async updateUser<T>(updatedUser): Promise<T> {
    // reformat date and hour to api format
    const data: {
      fn: string
      uid: User['uid']
      token: User['token']
      rdv: string
      debug: string
    } = {
      fn: 'setRdv',
      uid: updatedUser.uid,
      token: updatedUser.token,
      rdv: formatApiDate(updatedUser.date, updatedUser.hour),
      debug: 'false',
    }

    return await apiCalls.putRequest(this.rdvMockupEndpoint, data)
  }
}
