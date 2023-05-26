import './landing.scss'

// hooks
import { useLocation } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'

// components
import Calendar from '../calendar/calendarComponent.tsx'

// context
import { UserDataContext } from '../../../data/context/user.tsx'
import { CalendarDataContext } from '../../../data/context/calendar.tsx'
import { LoaderContext } from '../../../data/context/loader.tsx'

// types
import { User } from '../../../data/API/models/User.ts'
import { unformatDate } from '../../../utils/date.ts'

export default function Landing(): JSX.Element {
  // child props states
  const [calendarTitle, setCalendarTitle] = useState<React.ReactNode>('')
  const [message, setMessage] = useState<string>('')
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false)

  // context
  const { isLoading } = useContext(LoaderContext)
  const { user, getUser, isDateAlreadyBooked } = useContext(UserDataContext)
  const { bookedDates, getBookedDates } = useContext(CalendarDataContext)

  const query: URLSearchParams = new URLSearchParams(useLocation().search)
  const smsId: string = query.get('id')

  const handleBookingMessage = (user?: User): void => {
    if (!isDateAlreadyBooked) {
      setCalendarTitle(
        'Choisissez une date pour notre entretien. Veuillez noter que vous pouvez sélectionner une date dans les 15 prochains jours.'
      )
      return
    }
    setCalendarTitle(
      <>
        <span className="material-symbols-outlined warning">warning</span> Vous
        avez déjà un rendez-vous le {unformatDate(user.date)} à {user.hour}.
        Vous avez la possibilité de modifier votre rendez-vous en choisissant
        une nouvelle date dans les 15 prochains jours.
      </>
    )
  }

  useEffect(() => {
    getUser(smsId)
  }, [smsId])

  useEffect(() => {
    handleBookingMessage(user)
  }, [user])

  useEffect(() => {
    getBookedDates(smsId)
  }, [smsId])

  return (
    <section className={'landing'}>
      {isLoading ? (
        <div className={'loaderWrapper'}>
          <div className="loader"></div>
        </div>
      ) : user ? (
        <>
          {isFormSubmitted ? (
            <div className={'landing__message'}>
              {message.split('\n').map((line: string, index: number) => (
                <h3 className={'landing__message__text'} key={index}>
                  {line}
                  <br />
                </h3>
              ))}
            </div>
          ) : (
            <Calendar
              bookedDates={bookedDates}
              user={user}
              calendarTitle={calendarTitle}
              message={message}
              setMessage={setMessage}
              isFormSubmitted={isFormSubmitted}
              setIsFormSubmitted={setIsFormSubmitted}
            />
          )}
        </>
      ) : (
        <div className={'landing__false'}>
          <h2 className={'landing__false__title'}>Lien invalide</h2>
          <p className={'landing__false__message'}>
            Utilisez le lien qui vous a été envoyé par SMS ou contacter le
            service recrutement
          </p>
        </div>
      )}
    </section>
  )
}
