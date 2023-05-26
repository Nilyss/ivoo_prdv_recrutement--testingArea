import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'

// context
import { LoaderProvider } from './data/context/loader.tsx'
import { UserDataProvider } from './data/context/user.tsx'
import { CalendarDataProvider } from './data/context/calendar.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LoaderProvider>
      <UserDataProvider>
        <CalendarDataProvider>
          <App />
        </CalendarDataProvider>
      </UserDataProvider>
    </LoaderProvider>
  </React.StrictMode>
)
