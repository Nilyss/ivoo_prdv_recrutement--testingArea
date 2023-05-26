import './footer.scss'
import brandingLogo from '../../../assets/images/branding/brandingLogo--alt.png'

export default function Footer() {
  return (
    <footer className={'footer'}>
      <figure className={'footer__logoWrapper'}>
        <img
          className={'footer__logoWrapper__img'}
          src={brandingLogo}
          alt="logo"
        />
      </figure>
      <p className={'footer__copyright'}>©️Ivoo 2023</p>
    </footer>
  )
}
