import "./HomeDash.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import StyledButton2 from '../../Helpers/StyledButton2'

const HomeDash = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.UserReducer.userData);
  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("tokenKey");
  };
  return (
    <div className="homedash">
      <div className="header-homedash">
        <div className="headerMenu">
          <div className="item1">
            <FontAwesomeIcon
              style={{
                fontSize: "2.5rem",
                paddingTop: "10px",
                paddingLeft: "15px",
              }}
              className='faBarsHomeDash'
              icon={faBars}
            />
          </div>
          <div className="item2">
            <h3 className="h3-homedash-item2">
              Bienvenue, {localStorage.firstname}{" "}
            </h3>
          </div>
          <div className="item3">
            <FontAwesomeIcon
              className="faLogOut"
              onClick={handleLogOut}
              style={{
                fontSize: "2.5rem",
                paddingTop: "10px",
                paddingLeft: "15px",
              }}
              icon={faRightFromBracket}
            />
          </div>
        </div>
      </div>
      <div className="bodyHomeDash">
        <div className="itemButton1">
          <StyledButton2 btnType='submit' btnText='Show Other Reports'/>
        </div>
        <div className="itemButton2">
          <StyledButton2 btnType='submit' btnText='Submit A Public Report'/>
        </div>
        <div className="itemButton3">
          <StyledButton2 btnType='submit' btnText='Submit An Anonymous Report'/>
        </div>
      </div>
    </div>
  );
};

export default HomeDash;
