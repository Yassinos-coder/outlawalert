/* eslint-disable react-hooks/exhaustive-deps */
import "./MyAccount.css";
import React from "react";
import Header from "../../Components/Header/Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StyledButton2 from "../../Helpers/StyledButton2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faTrash } from "@fortawesome/free-solid-svg-icons";

const MyAccount = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.UserReducer.userData);

  useEffect(() => {
    if (
      JSON.stringify(userData) === "{}" ||
      userData === undefined ||
      userData === null
    ) {
      navigate("/SignIn");
    }
  }, [userData]);

  return (
    <>
      <div className="myaccount">
        <Header />
        <div className="pp">
          <img
            className="pp-img"
            src={
              userData.avatar === "noavatar"
                ? `http://localhost:8009/UsersProfilePics/${userData.avatar}`
                : "http://localhost:8009/UsersProfilePics/default.png"
            }
            alt=""
          />
        </div>
        <div className="ppActions">
        <FontAwesomeIcon icon={faRepeat} className="faRepeat"/>
        <hr className="hrImgActions"/>
        <FontAwesomeIcon style={{paddingLeft:'40px'}} icon={faTrash} className="faTrash"/>
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
