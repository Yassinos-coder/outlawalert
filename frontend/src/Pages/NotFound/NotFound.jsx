import './NotFound.css'
import PicError from '../../assets/img/404Error.png'
import {Link} from 'react-router-dom'


const NotFound = () => {
  return (
    <>
      <div className="notfound">
        <img className='errorPic' src={PicError} alt="" />
        <p className="text">
          It looks like you're trying to access an unlocated route <br /> Please go back to <Link className='a-homepage-error' to="/">HomePage</Link>
        </p>
      </div>
    </>
  )
}

export default NotFound
