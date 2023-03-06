import './AccountVerif.css'
import React from 'react'
import { useSelector } from 'react-redux'

const AccountVerif = () => {
    const userInfoForVerif = useSelector((state) => state.UserReducer.userInfoForVerif)

  return (
    <div className='AccountVerif'>
      <div className="message">
        <h2 style={{paddingBottom:'15px'}}>Account Verification Process</h2>
        <p> 
            Please verify your account by click on this <button className='btn-verif-accnt'>Send Verification Email</button> <br />
            you'll recieve the link in your email address.
        </p>
      </div>
    </div>
  )
}

export default AccountVerif
