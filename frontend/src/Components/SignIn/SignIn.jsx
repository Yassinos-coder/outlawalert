import "./SignIn.css";
import logo from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import StyledButton from "../../Helpers/StyledButton";
import SignInModal from "../../Modals/SignInModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogIn, RequestPasswordReset } from "../../Redux/UserReducer";
import AlertPopUp from "../../Helpers/AlertPopUp";
import Loader from "../../Helpers/Loader";
import audiofile from "../../assets/sounds/login_success.mp3";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const audioSuccess = new Audio(audiofile);
  const [newSignIn, setNewSignIn] = useState(new SignInModal());
  const [ErrorLogin, setErrorLogin] = useState(false);
  const [NoUserError, setNoUserError] = useState(false);
  const pendingStatus = useSelector((state) => state.UserReducer.status);
  const [resetPassData, setResetPassData] = useState(null);
  const [resetRequestSuccess, setResetRequestSuccess] = useState(false);
  const [ResetRequestFailed, setResetRequestFailed] = useState(false);

  const handleLogin = () => {
    dispatch(LogIn(newSignIn))
      .then((response) => {
        if (response.payload.giveAccess === true) {
          localStorage.tokenKey = response.payload.token;
          localStorage.uuid = response.payload.userData._id;
          localStorage.username = response.payload.userData.username;
          localStorage.firstname = response.payload.userData.firstname;
          audioSuccess.volume = 0.4;
          audioSuccess.play();
          localStorage.bigKey = response.payload.giveAccess;
          navigate(`/Dashboard/${response.payload.userData._id}`);
        } else if (
          response.payload.message === "WrongPass" &&
          response.payload.giveAccess === false
        ) {
          setErrorLogin(true);
        } else if (response.payload === "UserNoExist") {
          setNoUserError(true);
        }
      })
      .catch((err) => {
        console.warn(`Error in LogIn Dispatch ${err}`);
      });
  };

  const handlePasswordReset = () => {
    dispatch(RequestPasswordReset({ cin: resetPassData.cin })).then((data) => {
      if (data.payload.message === "requestSent") {
        setResetRequestSuccess(true);
      } else if (data.payload.message === "requestFailed") {
        setResetRequestFailed(true);
      }
    });
  };

  return (
    <>
      <div className="signin">
        <Loader loadVisible={pendingStatus === "pending" ? true : false} />
        <div className="alert">
          <AlertPopUp
            alertTitle="Reset Request Sent !"
            alertVisible={resetRequestSuccess === true ? true : false}
            alertMsg="Reset Request Sent Successfuly !"
            alertType="success"
          />
          <AlertPopUp
            alertTitle="Reset Request Failed !"
            alertVisible={ResetRequestFailed === true ? true : false}
            alertMsg="Reset Request Failed !"
            alertType="warning"
          />

          <AlertPopUp
            alertTitle="Login Error"
            alertVisible={NoUserError === true ? true : false}
            alertMsg="This User doesn't exist"
            alertType="warning"
          />
          <AlertPopUp
            alertTitle="Login Error"
            alertVisible={ErrorLogin === true ? true : false}
            alertMsg="Wrong Password, Try Again !"
            alertType="danger"
          />
        </div>
        <div className="logoSignin">
          <img className="logoSignin-si" src={logo} alt="" />
        </div>
        <div className="login-box">
          <div className="userBox">
            <label className="labels-login" htmlFor="cin">
              C.I.N
            </label>
            <input
              className="input-login"
              type="text"
              required
              name="cin"
              placeholder="Entrez votre CIN"
              onChange={(e) => {
                if (e.currentTarget.value === "") {
                  alert("CIN Cannot be empty !");
                } else {
                  setNewSignIn({
                    ...newSignIn,
                    cin: e.currentTarget.value.toLowerCase(),
                  });
                  setResetPassData({
                    ...resetPassData,
                    cin: e.currentTarget.value,
                  });
                }
              }}
            />
          </div>
          <div className="userBox">
            <label className="labels-login" htmlFor="password">
              Password
            </label>
            <input
              className="input-login"
              type="password"
              required
              name="password"
              placeholder="Entrez votre Password"
              onChange={(e) => {
                setNewSignIn({ ...newSignIn, password: e.currentTarget.value });
              }}
            />
          </div>
          <div className="userBox">
            <StyledButton
              btnType="submit"
              btnText="Sign In"
              onClick={handleLogin}
            />
          </div>
          <div className="userBox">
            <p className="p-fp">
              Forgot your password ?{" "}
              <span onClick={handlePasswordReset}>Reset Password</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
