import './calendar.scss'

// utils
import * as utils from '../../../utils/date'

// models
import { createUser, User } from '../../../data/API/models/User.ts'

// hooks
import { useContext, useEffect, useState } from 'react'

// context
import { LoaderContext } from '../../../data/context/loader.tsx'

// libs
import Calendar from 'react-calendar' // https://github.com/wojtekmaj/react-calendar
import 'react-calendar/dist/Calendar.css'

// Services
import CalendarService from '../../../data/API/services/CalendarService.ts'

const calendarService: CalendarService = new CalendarService()

export default function CalendarComponent({
  bookedDates,
  user,
  calendarTitle,
  message,
  setMessage,
  isFormSubmitted,
  setIsFormSubmitted,
}) {
  const [calendarValue, setCalendarValue] = useState<Date>(new Date())
  const [showInput, setShowInput] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date>(null)
  const [availableTimes, setAvailableTimes] = useState<string[]>([])

  // context
  const { isLoading, setIsLoading } = useContext(LoaderContext)

  const closeInput = (): void => {
    setShowInput(false)
  }

  const times: string[] = [
    'Créneaux disponible',
    '08h30',
    '08h50',
    '09h10',
    '09h30',
    '09h50',
    '10h10',
    '10h30',
    '10h50',
    '11h10',
    '11h30',
    '11h50',
    '12h10',
    '12h30',
    '12h50',
    '13h10',
    '13h30',
    '13h50',
    '14h10',
    '14h30',
    '14h50',
    '15h10',
    '15h30',
    '15h50',
    '16h10',
    '16h30',
    '16h50',
  ]

  useEffect((): void => {
    if (selectedDate) {
      const bookedTimesForSelectedDate = bookedDates
        .filter(
          (bookedDate): boolean =>
            bookedDate.date === utils.formatDate(selectedDate, 'api')
        )
        .map((bookedDate) => bookedDate.hour)

      const newAvailableTimes: string[] = times.filter(
        (time: string) => !bookedTimesForSelectedDate.includes(time)
      )
      setAvailableTimes(newAvailableTimes)
    }
  }, [selectedDate])

  // calendar range
  const minDate: Date = new Date()
  const maxDate: Date = new Date(
    minDate.getFullYear(),
    minDate.getMonth() + 2,
    0
  )
  const disableDates = ({ date }) => {
    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = date.getDay()

    // Disable weekends (Saturday and Sunday)
    const disableWeekends: boolean = dayOfWeek === 0 || dayOfWeek === 6

    // Get the current date
    const currentDate: Date = new Date()

    // Calculate the date 15 days from now
    const futureDate: Date = new Date()
    futureDate.setDate(currentDate.getDate() + 15)

    // Disable dates that are 15 days after the current date
    const disableFutureDates: boolean = date.getTime() > futureDate.getTime()

    // Disable the date if it's a weekend or 15 days after the current date
    return disableWeekends || disableFutureDates
  }

  const handleSelectedDate = (value: Date): void => {
    setCalendarValue(value)
    setSelectedDate(value)
    setShowInput(true)
  }
  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault()
    setMessage('')

    const formattedSelectedDate: string = utils.formatDate(selectedDate, 'api')
    const timeSelected: string = e.target['time'].value

    if (timeSelected !== 'Créneaux disponible') {
      setIsLoading(true)

      const updatedUser: User = createUser(
        user.uid,
        user.token,
        formattedSelectedDate,
        timeSelected,
        user.valid
      )

      const saveDate: User = await calendarService.updateUser(updatedUser)

      setIsLoading(false)

      if (!saveDate) {
        setMessage(
          `Une erreur est survenue lors de l'enregistrement de votre rendez-vous. Veuillez réessayer.`
        )
        return
      }

      setMessage(
        `Votre rendez-vous a bien été enregistré, le ${utils.formatDate(
          selectedDate,
          'views'
        )} à ${updatedUser.hour}. \n Vous pouvez quitter cette page.`
      )
      setIsFormSubmitted(true)
    } else {
      setMessage('Veuillez choisir un créneau horaire disponible')
    }
  }

  return (
    <section className={'calendarSection'}>
      <div className={'calendarSection__calendarTitleWrapper'}>
        <h2 className={'calendarSection__calendarTitleWrapper__title'}>
          Calendrier
        </h2>
      </div>

      <div className={'calendarSection__calendarDescriptionWrapper'}>
        <p
          className={'calendarSection__calendarDescriptionWrapper__description'}
        >
          {calendarTitle}
        </p>
      </div>

      {isLoading ? (
        <div className={'loaderWrapper'}>
          <div className="loader"></div>
        </div>
      ) : (
        <Calendar
          className={'calendarSection__calendar'}
          onChange={handleSelectedDate}
          value={calendarValue}
          calendarType={'ISO 8601'}
          locale={'fr'}
          minDate={minDate}
          maxDate={maxDate}
          tileDisabled={disableDates}
        />
      )}

      {showInput && (
        <div className={'calendarModal'}>
          <span
            onClick={closeInput}
            title={'Retour'}
            className="material-symbols-outlined closeModalIcon"
          >
            close
          </span>
          <h3 className={'calendarModal__title'}>
            Choisissez un horaire pour le{' '}
            <span className={'calendarModal__title--date'}>
              {utils.formatDate(selectedDate, 'views')}
            </span>{' '}
            :{' '}
          </h3>
          <form
            className={'calendarSection__hoursSelectWrapper'}
            onSubmit={handleSubmit}
          >
            <select
              className={'calendarSection__hoursSelectWrapper__select'}
              id="time"
              name="time"
            >
              {availableTimes &&
                availableTimes.map((time: string, index: number) => (
                  <option
                    key={index}
                    className={
                      'calendarSection__hoursSelectWrapper__select__options'
                    }
                    value={time}
                  >
                    {time}
                  </option>
                ))}
            </select>
            <p className={isFormSubmitted ? 'valid' : 'invalid'}>{message}</p>
            <div
              className={'calendarSection__hoursSelectWrapper__buttonWrapper'}
            >
              {isFormSubmitted ? (
                <>
                  <button
                    className={'calendarSection__hoursSelectWrapper__button'}
                    type={'button'}
                    onClick={closeInput}
                  >
                    Fermer
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={'calendarSection__hoursSelectWrapper__button'}
                    type={'submit'}
                  >
                    Valider
                  </button>
                  <button
                    className={'calendarSection__hoursSelectWrapper__button'}
                    type={'button'}
                    onClick={() => setShowInput(false)}
                  >
                    Retour
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      )}
    </section>
  )
}
