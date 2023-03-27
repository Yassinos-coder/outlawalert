/* eslint-disable react-hooks/exhaustive-deps */
import "./HomeDash.css";
// import { useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import audiofile from '../../assets/sounds/login_success.mp3'

const HomeDash = () => {
  // const userData = useSelector((state) => state.UserReducer.userData);
  const audioSuccess = new Audio(audiofile);
  const tokenKey = localStorage.getItem('tokenKey');


  useEffect(() =>{

    if (tokenKey) {
      audioSuccess.volume = 0.5;
      audioSuccess.play();
    }  
  }, [tokenKey])

  return (
    <div className="homedash">
      <Header />
      <div className="bodyMain">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeDash;
