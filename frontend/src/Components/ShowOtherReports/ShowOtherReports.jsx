/* eslint-disable react-hooks/exhaustive-deps */
import "./ShowOtherReports.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Helpers/Loader";
import { getAllReports } from "../../Redux/ReportReducer";
import { Link } from "react-router-dom";

const ShowOtherReports = () => {
  const dispatch = useDispatch();
  const pendingStatus = useSelector((state) => state.ReportReducer.status);
  const AllReports = useSelector((state) => state.ReportReducer.AllReports);

  useEffect(() => {
    dispatch(getAllReports());
  }, []);

  return (
    <>
      <div className="showotherreports">
        <Loader loadVisible={pendingStatus === "pending" ? true : false} />
        <div className="cmpTitle">Other Reports</div>
        <div className="reports">
          {AllReports.map((report, index) => (
            <>
              <div key={index} className={`reportsDIV report${index}`}>
                <span className="reportTitle">
                  {" "}
                  {report.reportTitle}{" "}
                  {report.isReportAnonyme ? (
                    <p
                      style={{
                        position: "relative",
                        paddingLeft: "10px",
                        fontSize: "15px",
                        color: "grey",
                      }}
                    >
                      Private Report
                    </p>
                  ) : (
                    <p
                      style={{
                        position: "relative",
                        paddingLeft: "10px",
                        fontSize: "15px",
                        color: "grey",
                      }}
                    >
                      Public Report
                    </p>
                  )}{" "}
                </span>
                <p className="reportSubject">
                  {" "}
                  {report.reportSubject}, {report.reportDate}, à{" "}
                  {report.reportLocationCoords}{" "}
                </p>
                <div className="reportMessageDIV">
                  <p className="reportMessage"> {report.reportMessage} </p>
                  <div className="reportMediaAttachement">
                    {report.reportMediaAttachement
                      .slice(1)
                      .map((mediaFile, index) => (
                        <Link
                          key={index}
                          to={`http://192.168.4.4:8009/${mediaFile}`}
                        >
                          <img
                            className="images"
                            key={index}
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
