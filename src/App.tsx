import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

// components
import Header from './views/components/header/header'
import Footer from './views/components/footer/footer'

// pages
import Home from './views/pages/home/home'
import NotFoundPage from './views/pages/notFound/404.tsx'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={'/'} element={<Navigate to="/sms" />} />
        <Route path={'/sms'} element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
