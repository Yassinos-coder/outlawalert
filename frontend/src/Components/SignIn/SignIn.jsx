import "./SignIn.css";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import StyledButton from "../../Helpers/StyledButton";
import SignInModal from "../../Modals/SignInModal";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { LogIn } from "../../Redux/UserReducer";

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [newSignIn, setNewSignIn] = useState(new SignInModal())

  const handleLogin = () => {
    dispatch(LogIn(newSignIn)).then((response) => {
      if (response.payload.giveAccess === true) {
        localStorage.tokenKey = response.payload.token
        localStorage.bigKey = response.payload.giveAccess
        navigate(`/${response.payload.userData._id}/Dashboard`)
      } else {
        
      }
    }).catch((err) => {
      console.error(`Error in LogIn Dispatch ${err}`)
    })
  }


  return (
    <>
      <div className="signin">
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
