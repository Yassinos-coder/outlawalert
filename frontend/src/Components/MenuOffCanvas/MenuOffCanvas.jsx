import "./MenuOffCanvas.css";
import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile, faChevronLeft, faUser} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

const MenuOffCanvas = (props) => {
  const [show, setShow] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    setShow(props.isMenuToggle);
  }, [props.isMenuToggle]);

  return (
    <>
      <div
        className={`OffCanvas ${
          props.isMenuToggle === true ? "OffCanvasActive" : ""
        }`}
        style={show === true ? {} : { display: "none" }}
      >
        <div className="menuTitle">
          <h2 style={{paddingBottom:'10px'}}>Outlaw Alert Actions</h2>
        </div>
        <div className="menuActions">
            <div className="btnActionsOffCanvasMenuItem1">
                <button className="btnActionsOffCanvas" onClick={() => {
                  setShow(false)
                  navigate(`/Dashboard/${localStorage.uuid}`)
                }}>
                    <FontAwesomeIcon style={{paddingRight:'10px'}} icon={faChevronLeft}/>
                    Back To Homepage</button>
            </div>
            <div className="btnActionsOffCanvasMenuItem2">
                <button className="btnActionsOffCanvas" onClick={() => {navigate(`/ReportsHistory/${localStorage.uuid}`)}}>
                    <FontAwesomeIcon style={{paddingRight:'10px'}} icon={faFile}/>
                    Reports History</button>
            </div>
            <div className="btnActionsOffCanvasMenuItem3">
                <button className="btnActionsOffCanvas" onClick={() => {navigate(`/MyAccount/${localStorage.uuid}`)}}>
                    <FontAwesomeIcon style={{paddingRight:'10px'}} icon={faUser}/>
                    My Account</button>
            </div>
        </div>
      </div>
    </>
  );
};

export default MenuOffCanvas;
