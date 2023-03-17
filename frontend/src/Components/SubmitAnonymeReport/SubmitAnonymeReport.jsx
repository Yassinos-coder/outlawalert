import "../SubmitPublicReport/SubmitPublicReport.css";
import React, { useEffect, useState } from "react";
import AlertPopUp from "../../Helpers/AlertPopUp";
import { useDispatch } from "react-redux";
import AddReportModal from "../../Modals/AddReportModal";
import { addReport, uploadMediaAttachement } from "../../Redux/ReportReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import StyledButton from "../../Helpers/StyledButton";

const SubmitAnonymeReport = () => {
  const dispatch = useDispatch();
  const [customReportSubject, setCustomReportSubject] = useState(false);
  const [newReport, setNewReport] = useState(new AddReportModal());
  const [locationCoordAfterFa, setLocationCoordAfterFa] = useState();
  const [fileInfo, setFileInfo] = useState();
  const [isAnonymeReportSendingSuccess, setAnonymeReportSendingSuccess] =
    useState(false);
  const [ReportAnonymeSendingFailed, setAnonymeReportSendingFailed] =
    useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((currentPosition) => {
        console.log(
          `Your position is => Latitude: ${currentPosition.coords.latitude}, Longtitude: ${currentPosition.coords.longitude}, Altitude: ${currentPosition.coords.altitude}`
        );
      });
    } else {
      alert("Please give us access to your position");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptionReportSubject = (event) => {
    let option = event.target.options[event.target.selectedIndex].value;
    if (option === "other") {
      setCustomReportSubject(true);
    } else {
      setCustomReportSubject(false);
      setNewReport({ ...newReport, reportSubject: option });
    }
  };

  const handleReportSubmit = () => {
    dispatch(addReport({ newReport }));
    const allfiles = new FormData();
    for (let i = 0; i < fileInfo.length; i++) {
      allfiles.append("allfiles", fileInfo[i]);
    }
    dispatch(
      uploadMediaAttachement({ userid: localStorage.uuid, files: allfiles })
    ).then((data) => {
      console.log(data.payload);
      if (data.payload === "uploadSuccess") {
        setAnonymeReportSendingSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (data.payload === "failed") {
        setAnonymeReportSendingFailed(true);
      }
    });
  };

  return (
    <>
      <div className="SubmitAnonymeReport">
        <div className="alert">
          <AlertPopUp
            alertTitle="Information"
            alertMsg="Please all submitted information must be correct."
            alertType="normal"
            alertVisible={true}
          />
          <AlertPopUp
            alertTitle="Information"
            alertMsg="Report Success."
            alertType="normal"
            alertVisible={isAnonymeReportSendingSuccess}
          />
          <AlertPopUp
            alertTitle="Error Failed To Report"
            alertMsg="An error occured while reporting please try again."
            alertType="danger"
            alertVisible={ReportAnonymeSendingFailed}
          />
        </div>
        <div className="noticeText">
          <p>Anonyme Report Submittion</p>
        </div>
        <div className="reportSubmittion">
          <label htmlFor="reportTitle" className="reportLables">
            - Report Title :
          </label>
          <input
            type="text"
            id="reportTitle"
            className="reportInputs"
            placeholder="Enter Report Title"
            onChange={(e) => {
              const currentDate = new Date();
              const formattedDate = currentDate.toLocaleString();
              setNewReport({
                ...newReport,
                reporter: localStorage.uuid,
                reportTitle: e.currentTarget.value,
                isReportAnonyme: true,
                reportDate: formattedDate,
              });
            }}
          />
          <label htmlFor="reportSubject" className="reportLables">
            - What Type of reports ?{" "}
          </label>
          <select
            name="reportSubject"
            className="reportInputs"
            id="reportSubject"
            onChange={(event) => {
              handleOptionReportSubject(event);
            }}
          >
            <option value="default">Choose from below</option>
            <option value="physicalAssault">Physical Assault</option>
            <option value="moralAssault">Moral Assault</option>
            <option value="publicAssault">Public Assault</option>
            <option value="publicDisrespect">Public Disrespect</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            className="reportInputs"
            style={customReportSubject === false ? { display: "none" } : {}}
            placeholder="Enter Subject of report"
            onChange={(e) => {
              setNewReport({
                ...newReport,
                reportSubject: e.currentTarget.value,
              });
            }}
          />
          <label htmlFor="reportMessage" className="reportLables">
            - Report Message :
          </label>
          <textarea
            type="text"
            id="reportMessage"
            className="reportInputs"
            placeholder="Enter Report Message"
            onChange={(e) => {
              setNewReport({
                ...newReport,
                reportMessage: e.currentTarget.value,
              });
            }}
          />
          <label htmlFor="incidentLocation" className="reportLables">
            - Incident Location :
          </label>
          <span>
            <input
              type="text"
              value={locationCoordAfterFa === "" ? "" : locationCoordAfterFa}
              id="incidentLocation"
              className="reportInputs incidentLocation"
              placeholder="Enter Incident Location"
              onChange={(e) => {
                setNewReport({
                  ...newReport,
                  reportLocationCoords: e.currentTarget.value,
                });
              }}
            />
            <FontAwesomeIcon
              className="faLocation"
              icon={faLocationCrosshairs}
              onClick={(e) => {
                navigator.geolocation.getCurrentPosition((currentPosition) => {
                  setNewReport({
                    ...newReport,
                    reportLocationCoords: `${currentPosition.coords.latitude} ${currentPosition.coords.longitude}`,
                  });
                  setLocationCoordAfterFa(
                    `${currentPosition.coords.latitude} ${currentPosition.coords.longitude}`
                  );
                });
              }}
            />
          </span>
          <label htmlFor="uploads" className="reportLables">
            - Upload Pictures or Videos :
          </label>
          <input
            type="file"
            id="uploads"
            className="reportInputs-file reportInputs"
            title="Upload Pictures or Videos of Incident"
            onChange={(e) => {
              setFileInfo(e.currentTarget.files);
            }}
            multiple
          />
        </div>
        <div className="submitButton">
          <StyledButton
            btnType="submit"
            btnText="Submit Report"
            onClick={handleReportSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default SubmitAnonymeReport;
