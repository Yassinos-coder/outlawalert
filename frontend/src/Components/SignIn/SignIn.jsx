import "./SignIn.css";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import StyledButton from "../../Helpers/StyledButton";
import SignInModal from "../../Modals/SignInModal";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { LogIn } from "../../Redux/UserReducer";
import AlertPopUp from '../../Helpers/AlertPopUp'
import Loader from "../../Helpers/Loader";

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [newSignIn, setNewSignIn] = useState(new SignInModal())
  const [ErrorLogin, setErrorLogin] = useState(false)
  const [NoUserError, setNoUserError] = useState(false)
  const pendingStatus = useSelector((state) => state.UserReducer.status);

  const handleLogin = () => {

    dispatch(LogIn(newSignIn)).then((response) => {
      if (response.payload.giveAccess === true) {
        localStorage.tokenKey = response.payload.token
        localStorage.bigKey = response.payload.giveAccess
        navigate(`/Dashboard/${response.payload.userData._id}`)
      } else if (response.payload.message === "WrongPass" && response.payload.giveAccess === false) {
        setErrorLogin(true)
      } else if(response.payload === "UserNoExist") {
        setNoUserError(true)
      }
    }).catch((err) => {
      console.error(`Error in LogIn Dispatch ${err}`)
    })
  }

  return (
    <>
      <div className="signin">
        <Loader loadVisible={pendingStatus === 'pending' ? true : false} />
      <div className="alert">
            <AlertPopUp alertTitle='Login Error' alertVisible={NoUserError === true ? true : false}  alertMsg="This User doesn't exist" alertType='warning' />
            <AlertPopUp alertTitle='Login Error' alertVisible={ErrorLogin === true ? true : false}  alertMsg="Wrong Password, Try Again !" alertType='danger' />
      </div>
        <div className="logo">
          <img className="logo-si" src={logo} alt="" />
        </div>
        <div className="login-box">
          <div className="userBox">
            <label className="labels-login" htmlFor="cin">C.I.N</label>
            <input className="input-login" type="text" required name="cin" placeholder="Entrez votre CIN"  onChange={(e) => {setNewSignIn({...newSignIn, cin: e.currentTarget.value})}}/>
          </div>
          <div className="userBox">
            <label className="labels-login" htmlFor="password">Password</label>
            <input className="input-login" type="password" required name="password" placeholder="Entrez votre Password" onChange={(e) => {setNewSignIn({...newSignIn, password: e.currentTarget.value})}}/>
          </div>
          <div className="userBox">
            <StyledButton btnType="submit"  btnText='Sign In' overrideStyle={{left:'20%', marginTop:'9%'}} onClick={handleLogin} />
          </div>
          <div className="userBox">
            <p className="p-fp">Forgot your password ? <Link to="/resetPassword">Reset Password</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
