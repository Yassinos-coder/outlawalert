/* eslint-disable react-hooks/exhaustive-deps */
import "./MyAccount.css";
import React from "react";
import Header from "../../Components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StyledButton2 from "../../Helpers/StyledButton2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../Helpers/Loader";
import AlertPopUp from "../../Helpers/AlertPopUp";
import {
  DeleterUserAvatar,
  EmailUpdate,
  GetUserData,
  PasswordUpdate,
  ProfilePicUpdater,
  UserDeleteAccount,
} from "../../Redux/UserReducer";
import { useState } from "react";

const MyAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserReducer.userData);
  const pendingStatus = useSelector((state) => state.UserReducer.status);
  const [updateFail, setUpdateFail] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteFail, setDeleteFail] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [passwordFail, setPasswordFail] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [emailFail, setEmailFail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [PassData, setPassData] = useState("");
  const [bigIssuePass, setBigPassIssue] = useState(false);
  const [ToggleEmailUpdate, setToggleEmailUpdate] = useState(false);
  const [TogglePassUpdate, setTogglePassUpdate] = useState(false);
  const [ToggleDeleteAccount, setToggleDeleteAccount] = useState(false);
  const [UserDeleteSuccess, setUserDeleteSuccess] = useState(false);
  const [UserDeleteFail, setUserDeleteFail] = useState(false);
  const [AvatarOnDisplay, setAvatarOnDisplay] = useState();

  useEffect(() => {
    if (
      JSON.stringify(userData) === "{}" ||
      userData === undefined ||
      userData === null
    ) {
      navigate("/SignIn");
    }
    if (userData.length === 0 || userData.length <= 0) {
      dispatch(GetUserData({ uuid: localStorage.uuid }));
    }
    console.log(userData);
    if (userData.avatar && userData.avatar !== "noavatar") {
      setAvatarOnDisplay(
        `http://localhost:8009/UsersProfilePics/${userData.username}/${userData.avatar}`
      );
    } else {
      setAvatarOnDisplay("http://localhost:8009/UsersProfilePics/default.png");
    }
  }, [userData]);

  const handleFileChange = (e) => {
    let imageUpload = e.currentTarget.files[0];
    const newPicture = new FormData();
    newPicture.append("newPicture", imageUpload);
    dispatch(
      ProfilePicUpdater({ uuid: localStorage.uuid, newPicture: newPicture })
    ).then((data) => {
      if (data.payload.message === "updateFailed") {
        setUpdateFail(true);
      } else if (data.payload.message === "updateSuccess") {
        setUpdateSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  };

  const handleClickOnDeleteAvatar = () => {
    dispatch(DeleterUserAvatar({ uuid: localStorage.uuid })).then((data) => {
      if (data.payload.message === "deleteSuccess") {
        setDeleteSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (data.payload.message === "deleteFail") {
        setDeleteFail(true);
      }
    });
  };

  const handleEmailUpdaterToggle = () => {
    setToggleEmailUpdate(!ToggleEmailUpdate);
  };

  const handleEmailUpdate = () => {
    dispatch(
      EmailUpdate({ uuid: localStorage.uuid, newEmailData: newEmail })
    ).then((data) => {
      if (data.payload.message === "emailUpdateSuccess") {
        setEmailSuccess(true);
        setToggleEmailUpdate(false);
      } else if (data.payload.message === "emailUpdateFail") {
        setEmailFail(true);
      }
    });
  };

  const handlePasswordUpdaterToggle = () => {
    setTogglePassUpdate(!TogglePassUpdate);
  };

  const handlePasswordUpdate = () => {
    dispatch(
      PasswordUpdate({ uuid: localStorage.uuid, PassData: PassData })
    ).then((data) => {
      if (data.payload.message === "passUpdateSuccess") {
        setPasswordSuccess(true);
        setTogglePassUpdate(false);
      } else if (data.payload.message === "emailUpdateFail") {
        setPasswordFail(true);
      } else if (data.payload.message === "SomethingWentWrong") {
        setBigPassIssue(true);
      }
    });
  };

  const handleDeleteAccountToggle = () => {
    setToggleDeleteAccount(!ToggleDeleteAccount);
  };

  const handleDeleteAccountConfirmation = () => {
    dispatch(UserDeleteAccount({ uuid: localStorage.uuid })).then((data) => {
      if (data.payload.message === "UserDeleteSuccess") {
        setUserDeleteSuccess(true);
        navigate("/");
      } else if (data.payload.message === "UserDeleteFailed") {
        setUserDeleteFail(true);
      }
    });
  };

  return (
    <>
      <div className="myaccount">
        <Loader loadVisible={pendingStatus === "pending" ? true : false} />
        <Header />
        <div className="alert">
          <AlertPopUp
            alertTitle="Upload Failed"
            alertVisible={updateFail === true ? true : false}
            alertMsg="Please try to reload the page!"
            alertType="warning"
          />
          <AlertPopUp
            alertTitle="Upload Success"
            alertVisible={updateSuccess === true ? true : false}
            alertMsg="Picture Uploaded Succesfully !"
            alertType="success"
          />
          <AlertPopUp
            alertTitle="Deletion Failed"
            alertVisible={deleteFail === true ? true : false}
            alertMsg="Please try to reload the page!"
            alertType="warning"
          />
          <AlertPopUp
            alertTitle="Deletion Success"
            alertVisible={deleteSuccess === true ? true : false}
            alertMsg="Picture Uploaded Succesfully !"
            alertType="success"
          />
          <AlertPopUp
            alertTitle="Email Update Failed"
            alertVisible={emailFail === true ? true : false}
            alertMsg="Please try to reload the page!"
            alertType="warning"
          />
          <AlertPopUp
            alertTitle="Email Update Success"
            alertVisible={emailSuccess === true ? true : false}
            alertMsg="Picture Uploaded Succesfully !"
            alertType="success"
          />
          <AlertPopUp
            alertTitle="Password Update Failed"
            alertVisible={passwordFail === true ? true : false}
            alertMsg="Please try to reload the page!"
            alertType="warning"
          />
          <AlertPopUp
            alertTitle="Password Update Failed"
            alertVisible={bigIssuePass === true ? true : false}
            alertMsg="Please try to reload the page!"
            alertType="danger"
          />
          <AlertPopUp
            alertTitle="Password Update Success"
            alertVisible={passwordSuccess === true ? true : false}
            alertMsg="Picture Uploaded Succesfully !"
            alertType="success"
          />
          <AlertPopUp
            alertTitle="User Deletion Failed"
            alertVisible={UserDeleteFail === true ? true : false}
            alertMsg="Please try to reload the page!"
            alertType="danger"
          />
          <AlertPopUp
            alertTitle="User Deletion Success"
            alertVisible={UserDeleteSuccess === true ? true : false}
            alertMsg="User Deletion Succesfully !"
            alertType="success"
          />
        </div>
        <div className="pp">
          <img className="pp-img" src={AvatarOnDisplay} alt="" />
        </div>
        <div className="ppActions">
          <label htmlFor="file-upload">
            <FontAwesomeIcon icon={faRepeat} className="faRepeat" />
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => {
              handleFileChange(e);
            }}
            style={{ display: "none" }}
          />
          <hr className="hrImgActions" />
          <FontAwesomeIcon
            icon={faTrash}
            className="faTrash"
            onClick={handleClickOnDeleteAvatar}
          />
        </div>
        <div className="btnListActions">
          <div>
            <StyledButton2
              btnType="submit"
              btnText="Change E-mail Address "
              onClick={handleEmailUpdaterToggle}
            />
            <div
              className="newEmail"
              style={ToggleEmailUpdate ? {} : { display: "none" }}
            >
              <input
                className="newEmail-Input"
                type="email"
                name="newEmail"
                id="newEmail"
                placeholder="Enter your new email"
                onChange={(e) => {
                  setNewEmail({ ...newEmail, email: e.currentTarget.value });
                }}
              />
              <button className="updateEmailBtn" onClick={handleEmailUpdate}>
                Update E-Mail
              </button>
            </div>
          </div>
          <div>
            <StyledButton2
              btnType="submit"
              btnText="Change Password "
              onClick={handlePasswordUpdaterToggle}
            />
            <div
              className="newPassword"
              style={TogglePassUpdate ? {} : { display: "none" }}
            >
              <input
                className="newPassword-Input"
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Enter your old password"
                onChange={(e) => {
                  setPassData({ ...PassData, oldpass: e.currentTarget.value });
                }}
              />
              <input
                className="newPassword-Input"
                type="password"
                name="newPassword"
                id="CMnewPassword"
                placeholder="Enter your new password"
                onChange={(e) => {
                  setPassData({ ...PassData, newpass: e.currentTarget.value });
                }}
              />
              <button
                className="updatePasswordBtn"
                onClick={handlePasswordUpdate}
              >
                Update Password
              </button>
            </div>
          </div>
          <div>
            <StyledButton2
              btnType="submit"
              btnText="Delete Account"
              onClick={handleDeleteAccountToggle}
            />
            <div
              className="deleteAccount"
              style={ToggleDeleteAccount ? {} : { display: "none" }}
            >
              <p>
                Are you sure ? <br /> there is no going back !
              </p>
              <button
                className="cancelActionDelete"
                onClick={() => {
                  setToggleDeleteAccount(false);
                }}
              >
                Cancel
              </button>
              <button
                className="confirmActionDelete"
                onClick={handleDeleteAccountConfirmation}
              >
                Yes, I'm Sure
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
