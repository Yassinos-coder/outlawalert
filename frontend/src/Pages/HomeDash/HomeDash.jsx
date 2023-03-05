import './HomeDash.css'
import {useSelector} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'

const HomeDash = () => {
  const navigate = useNavigate()
  const userData = useSelector((state) => state.UserReducer.userData)
  const handleLogOut = () => {
    navigate('/')
    localStorage.removeItem('tokenKey')
  }
  return (
    <>
        <div className="homedash">
            <div className="header-homedash">
              <div className="headerMenu">
                <div className="item1">
                  <FontAwesomeIcon style={{fontSize:'2.5rem', paddingTop:'10px', paddingLeft:'15px'}} icon={faBars} />
                </div>
                <div className="item2">
                  <h3 className='h3-homedash-item2'>Bienvenue, {userData.userData.firstname} </h3>
                </div>
                <div className="item3">
                <FontAwesomeIcon className='faLogOut' onClick={handleLogOut} style={{fontSize:'2.5rem', paddingTop:'10px', paddingLeft:'15px'}} icon={faRightFromBracket} />
                </div>
              </div>
            </div>
        </div> 
    </>
  )
}

export default HomeDash
