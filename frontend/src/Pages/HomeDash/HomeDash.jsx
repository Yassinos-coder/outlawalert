import "./HomeDash.css";
import { useSelector } from "react-redux";
import StyledButton2 from "../../Helpers/StyledButton2";
import Header from "../../Components/Header/Header";
import { Link, Outlet } from "react-router-dom";

const HomeDash = () => {
  const userData = useSelector((state) => state.UserReducer.userData);

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
