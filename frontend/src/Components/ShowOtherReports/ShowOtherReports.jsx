/* eslint-disable react-hooks/exhaustive-deps */
import "./ShowOtherReports.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Helpers/Loader";
import { getAllReports } from "../../Redux/ReportReducer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const ShowOtherReports = () => {
  const dispatch = useDispatch();
  const [noReportYet, setNoReportYet] = useState(true)
  const pendingStatus = useSelector((state) => state.ReportReducer.status);
  const AllReports = useSelector((state) => state.ReportReducer.AllReports);

  useEffect(() => {
    dispatch(getAllReports()).then((data) => {
      if (data.payload === '') {
        setNoReportYet(true)
      } else {
        setNoReportYet(false)
      }
    });
  }, []);

  return (
    <>
      <div className="showotherreports">
        <Loader loadVisible={pendingStatus === "pending" ? true : false} />
        <div className="cmpTitle">Other Reports</div>
          <p className="noreport" style={noReportYet ? {} : {display:'none'}}>
          <FontAwesomeIcon icon={faFolderOpen} style={{paddingRight:'10px'}} />
            No reports to show here yet.</p>
        <div className="reports">
          {AllReports.map((report, index) => (
            <>
              <div key={report._id} className={`reportsDIV report${index}`}>
                <Link to={`/Reports/${report._id}`} state={report}>
                  <FontAwesomeIcon
                    className="faToPost"
                    icon={faUpRightFromSquare}
                  />
                </Link>
                <span className="reportTitle">
                  {report.reportTitle}
                  {report.isReportAnonyme ? (
                    <p className="reportType">Private Report</p>
                  ) : (
                    <p className="reportType">Public Report</p>
                  )}
                </span>
                <p className="reportSubject">
                  {report.reportSubject}, {report.reportDate}, à
                  {report.reportLocationCoords}
                </p>
                <div className="reportMessageDIV">
                  <p className="reportMessage"> {report.reportMessage} </p>
                  <div className="reportMediaAttachement">
                    {report.reportMediaAttachement
                      .slice(1)
                      .map((mediaFile, indexMedia) => (
                        <Link
                          key={indexMedia}
                          to={`http://192.168.4.4:8009/${mediaFile}`}
                        >
                          <img
                            key={indexMedia}
                            className="images"
                            src={`http://192.168.4.4:8009/${mediaFile}`}
                            alt=""
                          />
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
              <hr className="hrAfterEachReport" />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowOtherReports;
