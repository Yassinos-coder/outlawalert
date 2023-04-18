import { useEffect, useState } from "react";
import "./ResetPassword.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PasswordResetExecution,
  checkUserForPasswordReset,
} from "../../Redux/UserReducer";
import Loader from "../../Helpers/Loader";
import StyledButton from "../../Helpers/StyledButton";
import AlertPopUp from "../../Helpers/AlertPopUp";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uuidFromUrl, setUuidFromUrl] = useState(null);
  const [userTokenFromURL, setTokenFromUrl] = useState(null);
  const pendingLoad = useSelector((state) => state.UserReducer.status);
  const [resetAllowed, setResetAllowance] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetFailed, setResetFailed] = useState(false);
  const [NewPassData, setNewPassData] = useState();

  useEffect(() => {
    const WindowURL = window.location.href.split("/");
    setUuidFromUrl(WindowURL[4]);
    setTokenFromUrl(WindowURL[5]);
    dispatch(checkUserForPasswordReset({ uuid: WindowURL[4] })).then((data) => {
      if (data.payload.message === "UserAllowed") {
        setResetAllowance(true);
      } else if (data.payload.message === "userNotAllowed") {
        setResetAllowance(false);
      }
    });
  }, []);

  const handleResetSubmit = () => {
    dispatch(
      PasswordResetExecution({
        uuid: uuidFromUrl,
        userToken: userTokenFromURL,
        NewPassData: NewPassData,
      })
    ).then((data) => {
      if (data.payload.message === "PassUpdateSuccess") {
        setResetSuccess(true);
      } else if (data.payload.message === "BigErrorRetry") {
        setResetFailed(true);
      } else if (data.payload.message === "UserDoesNotExist") {
        setResetFailed(true);
      } else if (data.payload.message === "BigError") {
        setResetFailed(true);
      }
    });
  };

  return (
    <>
      <div className="resetPassword">
        <div className="alert">
          <AlertPopUp
            alertTitle="Reset Success !"
            alertVisible={resetSuccess === true ? true : false}
            alertMsg="Reset Was Completed Successfuly !"
            alertType="success"
          />
          <AlertPopUp
            alertTitle="Reset Failed !"
            alertVisible={resetFailed === true ? true : false}
            alertMsg="Reset Failed !"
            alertType="warning"
          />
        </div>
        <div className="resetTitle">
          <h1>Reset Password</h1>
        </div>
        <div className="newPassInputsBox">
          {pendingLoad === "pending" ? (
            <>
              <Loader loadVisible={pendingLoad === "pending" ? true : false} />
            </>
          ) : resetAllowed === true ? (
            <>
              <h3 style={{ textAlign: "center", paddingTop: "10px" }}>
                Password Reset : <font color="green">Allowed</font>
              </h3>

              <div className="newPassInputs">
                <input
                  type="password"
                  name="new-password"
                  placeholder="Entrez un mot de passe"
                  onChange={(e) => {
                    setNewPassData({
                      NewPassData,
                      password: e.currentTarget.value,
                    });
                  }}
                />
                <input
                  type="password"
                  name="cm-password"
                  placeholder="Confirmez votre mot de passe"
                />
              </div>
              <div className="btnSubmitReset">
                <StyledButton
                  btnType=""
                  btnText="Reset Password"
                  onClick={handleResetSubmit}
                />
              </div>
            </>
          ) : resetAllowed === false ? (
            <>
              <h3 style={{ textAlign: "center", paddingTop: "10px" }}>
                Password Reset : <font color="red">Rejected</font>
              </h3>
              <p style={{ paddingTop: "15px", textAlign: "center" }}>
                Oups ! Something must be wrong because this user does not exist
                in my database <br /> Please Try Again !
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
