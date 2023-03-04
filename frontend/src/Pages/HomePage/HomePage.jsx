import './HomePage.css'
import logo from '../../assets/img/logo.png'
import StyledButton from '../../Helpers/StyledButton'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()
  localStorage.setItem('bigKey', false)
  localStorage.setItem('DeviceInfo', navigator.userAgent) 
  localStorage.setItem('OutlawAlertVisitor', true)

  return (
    <>
        <div className="homepage">
          <div className="logo">
            <img className='logo-hp' src={logo} alt="Outlaw Alert System" />
          </div>
          <div className="actions-hp">
            <h2 className='h2-hp'>Outlaw Alert System</h2>
            <div className="btnActions">
              <StyledButton btnType='submit' onClick={() => {navigate('./SignUp')}} btnText='Sign Up' />
              <hr className='hr1'/>
              <StyledButton onClick={() => {navigate('./SignIn')}}  btnType='submit' btnText='Sign In' />
            </div>
            <div className="moreTxt">
              <p>Sick of seeing unlawfull <br /> behavior be a hero of your home town <br /> and use your phone for <strong>good</strong>.</p>
            </div>
          </div>
          <div className="footer">
            <h3 className='h3-f-hp'>Founded By <a href="https://www.linkedin.com/in/yassine-castro-6a6ba7237/" rel='noopener noreferrer' target='_blank'>    Yassinos-Coder </a></h3>
          </div>
        </div>
    </>
  )
}

export default HomePage
