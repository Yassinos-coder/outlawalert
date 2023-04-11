import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuOffCanvas from '../MenuOffCanvas/MenuOffCanvas'
import './Header.css'

const Header = () => {
  const navigate = useNavigate()
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const handleLogOut = () => {
    navigate("/");
    localStorage.clear();
  };

  const handleMenuToggle = () => {
    setIsMenuVisible(!isMenuVisible)
  }

  return (
    <div className="header-homedash">
      <MenuOffCanvas isMenuToggle={isMenuVisible} />
        <div className="headerMenu">
          <div className="item1">
            <FontAwesomeIcon
              className='faBarsHomeDash'
              icon={faBars}
              onClick={handleMenuToggle}
            />
          </div>
          <div className="item2">
            <h3 className="h3-homedash-item2">
              Bienvenue, {localStorage.firstname}{" "}
            </h3>
          </div>
          <div className="item3">
            <FontAwesomeIcon
              className="faLogOut"
              onClick={handleLogOut}
              icon={faRightFromBracket}
            />
          </div>
        </div>
      </div>
  )
}

export default Header
