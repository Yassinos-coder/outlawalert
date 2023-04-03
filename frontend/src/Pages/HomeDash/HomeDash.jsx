/* eslint-disable react-hooks/exhaustive-deps */
import "./HomeDash.css";
import Header from "../../Components/Header/Header";
import { Outlet } from "react-router-dom";

const HomeDash = () => {

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
