import "./HomeDash.css";
// import { useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import audiofile from '../../assets/sounds/login_success.mp3'

const HomeDash = () => {
  // const userData = useSelector((state) => state.UserReducer.userData);
  const audioSuccess = new Audio(audiofile);

  useEffect(() =>{
    const tokenKey = localStorage.getItem('tokenKey');

    if (tokenKey) {
      audioSuccess.play();
    }  
  })

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
