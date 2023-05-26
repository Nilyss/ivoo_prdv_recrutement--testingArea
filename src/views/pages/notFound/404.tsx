import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import './notFound.scss'

const NotFoundPage: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <main className={'notFound__main'}>
      <h2 className={'notFound__main__title'}>Page non trouvée</h2>
      <p className={'notFound__main__overview'}>
        La page demandée n'existe pas.
      </p>
      <button onClick={goBack} className={'notFound__main__button'}>
        Revenir en arrière
      </button>
    </main>
  )
}

export default NotFoundPage
