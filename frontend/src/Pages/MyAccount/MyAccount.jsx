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
import { ProfilePicUpdater } from "../../Redux/UserReducer";
import { useState } from "react";

const MyAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserReducer.userData);
  const pendingStatus = useSelector((state) => state.UserReducer.status);
  const [updateFail, setUpdateFail] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (
      JSON.stringify(userData.userData) === "{}" ||
      userData.userData === undefined ||
      userData.userData === null
    ) {
      navigate("/SignIn");
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
        </div>
        <div className="pp">
          <img
            className="pp-img"
            src={
              userData.userData.avatar === "noavatar" || userData.userData.avatar === undefined || userData.userData.avatar === null 
                ? "http://localhost:8009/UsersProfilePics/default.png"
                : 'http://localhost:8009/UsersProfilePics/'+userData.userData.username+'/'+userData.userData.avatar
            }
            alt=""
          />
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
          <FontAwesomeIcon icon={faTrash} className="faTrash" />
        </div>
        <div className="btnListActions">
          <div>
            <StyledButton2 btnType="submit" btnText="Change E-mail Address " />
          </div>
          <div>
            <StyledButton2 btnType="submit" btnText="Change Password " />
          </div>
          <div>
            <StyledButton2 btnType="submit" btnText="Delete Account" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
