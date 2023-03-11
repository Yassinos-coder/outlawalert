/* eslint-disable react-hooks/exhaustive-deps */
import "./HomePage.css";
import logo from "../../assets/img/logo.png";
import StyledButton from "../../Helpers/StyledButton";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSystemHealth } from "../../Redux/SystemsReducer";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  localStorage.setItem("bigKey", false);
  localStorage.setItem("DeviceInfo", navigator.userAgent);
  localStorage.setItem("OutlawAlertVisitor", false);
  const [webStatus, setWebStatus] = useState("red");
  const [backStatus, setBackStatus] = useState("red");
  const [DBStatus, setDBStatus] = useState("red");
  const pendingStatus = useSelector((state) => state.SystemsReducer.status);

  useEffect(() => {
    const statusCheckerInterval = setInterval(() => {
      dispatch(GetSystemHealth())
        .then((response) => {
          switch (true) {
            case response.payload.db === true &&
              response.payload.server === true:
              setWebStatus("green");
              setBackStatus("green");
              setDBStatus("green");
              break;
            case response.payload.db === false &&
              response.payload.server === true:
              setWebStatus("green");
              setBackStatus("green");
              setDBStatus("red");
              break;
            case response.payload.db === true &&
              response.payload.server === false:
              setWebStatus("green");
              setBackStatus("red");
              setDBStatus("green");
              break;
            case response.payload.db === false &&
              response.payload.server === false:
              setWebStatus("green");
              setBackStatus("red");
              setDBStatus("red");
              break;
            default:
              break;
          }
          if (response.payload === undefined) {
            setWebStatus("green");
            setBackStatus("red");
            setDBStatus("red");
          }
          if (pendingStatus === "pending") {
            setWebStatus("yellow");
            setBackStatus("yellow");
            setDBStatus("yellow");
          }
        })
        .catch((err) =>
          console.error(`Error in dispatch(GetSystemHealth) ${err}`)
        );
    }, 5000);
    return () => clearInterval(statusCheckerInterval)
  }, []);

  return (
    <div className="homepage">
      <div className="header">
        <div className="status">
          <div className="status1">
            <p>
              {" "}
              <FontAwesomeIcon
                icon={faCircle}
                style={{ color: webStatus }}
              />{" "}
              Web Server
            </p>
          </div>
          <div className="status2">
            <p>
              {" "}
              <FontAwesomeIcon
                icon={faCircle}
                style={{ color: backStatus }}
              />{" "}
              BackEnd Server
            </p>
          </div>
          <div className="status3">
            <p>
              {" "}
              <FontAwesomeIcon
                icon={faCircle}
                style={{ color: DBStatus }}
              />{" "}
              DataBase Link
            </p>
          </div>
        </div>
      </div>
      <div className="logo">
        <img className="logo-hp" src={logo} alt="Outlaw Alert System" />
      </div>
      <div className="actions-hp">
        <h2 className="h2-hp">Outlaw Alert System</h2>
        <div className="btnActions">
          <StyledButton
            btnType="submit"
            onClick={() => {
              navigate("./SignUp");
            }}
            btnText="Sign Up"
          />
          <hr className="hr1" />
          <StyledButton
            onClick={() => {
              navigate("./SignIn");
            }}
            btnType="submit"
            btnText="Sign In"
          />
        </div>
        <div className="moreTxt">
          <p>
            Sick of seeing unlawfull <br /> behavior be a hero of your home town{" "}
            <br /> and use your phone for <strong>good</strong>.
          </p>
        </div>
      </div>
      <div className="footer">
        <h3 className="h3-f-hp">
          Founded By{" "}
          <a
            href="https://www.linkedin.com/in/yassine-castro-6a6ba7237/"
            rel="noopener noreferrer"
            target="_blank"
          >
            {" "}
            Yassinos-Coder{" "}
          </a>
        </h3>
      </div>
    </div>
  );
};

export default HomePage;
