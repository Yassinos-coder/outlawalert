/* eslint-disable react-hooks/exhaustive-deps */
import "./ReportsHistory.css";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllReports, getAllUserReports } from "../../Redux/ReportReducer";
import Loader from "../../Helpers/Loader";
import AlertPopUp from '../../Helpers/AlertPopUp'

const ReportsHistory = () => {
  const dispatch = useDispatch();
  const [deleteFailed, setDeleteFailed] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const AllUserReports = useSelector(
    (state) => state.ReportReducer.UserReports
  );
  const pendingStatus = useSelector((state) => state.ReportReducer.status);

  useEffect(() => {
    dispatch(getAllUserReports({ uuid: localStorage.uuid }));
  }, []);

  const handleClearAllVoid = () => {
    dispatch(deleteAllReports({ uuid: localStorage.uuid })).then((data) => {
      if (data.payload.message === 'deleteSuccess') {
        setDeleteSuccess(true)
      }else if (data.payload.message === 'deleteFailed') {
        setDeleteFailed(true)
      }
    })
  };

  return (
    <>
      <div className="reportHistory">
        <Header />
        <Loader loadVisible={pendingStatus === "pending" ? true : false} />
        <div className="alert">
          <AlertPopUp
            alertTitle="Operation Success"
            alertVisible={deleteSuccess === true ? true : false}
            alertMsg="Purging Successful"
            alertType="success"
          />
          <AlertPopUp
            alertTitle="Delete Error"
            alertVisible={deleteFailed === true ? true : false}
            alertMsg="Delete Failed, Try Again !"
            alertType="danger"
          />
        </div>
        <div className="reportBody">
          <button className="clearAllReports" onClick={handleClearAllVoid}>
            Clear All Reports
          </button>
          <table className="tableMaster">
            <thead className="tableMasterHead">
              <tr>
                <td># ID</td>
                <td>Report Date</td>
                <td>Report Context</td>
              </tr>
            </thead>
            <tbody>
              {AllUserReports.map((report, index) => (
                <tr key={index}>
                  <td> {index + 1} </td>
                  <td>{report.reportDate}</td>
                  <td>{report.reportTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReportsHistory;
