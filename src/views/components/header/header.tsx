// styles
import './header.scss'

// hooks
import { Link } from 'react-router-dom'

// assets
import brandingLogo from '../../../assets/images/branding/brandingLogo.png'

export default function Header() {
  return (
    <header className={'header'}>
      <figure className={'header__logoWrapper'}>
        <Link to={'/sms'} className={'header__logoWrapper__goToHome'}>
          <img
            className={'header__logoWrapper__goToHome__img'}
            src={brandingLogo}
            alt="logo"
          />
        </Link>
      </figure>
      <div className={'header__titleWrapper'}>
        <h1 className={'header__titleWrapper__title'}>Prise de rendez-vous</h1>
      </div>
    </header>
  )
}
