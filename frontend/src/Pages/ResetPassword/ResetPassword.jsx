import { useEffect } from "react";
import "./ResetPassword.css";
import React from "react";

const ResetPassword = () => {

    useEffect(() => {
        console.log(window.location())
    },[])


  return (
    <>
      <div className="resetPassword">

      </div>
    </>
  );
};

export default ResetPassword;
