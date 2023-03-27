import "./Post.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Post = () => {
  const location = useLocation();
  const reportData = location.state;
  const [commentSectionVisibility, setCommentSectionVisibility] =
    useState(faAngleDown);
  // const CommentsOnPost = useSelector((state) => state.ReportsReducer.CommentsOnPost)

  const handleCommentSectionCollapse = () => {
    setCommentSectionVisibility(
      commentSectionVisibility === faAngleDown ? faAngleUp : faAngleDown
    );
  };

  return (
    <>
      <div className="post">
        <Header />
        <div className="postTitle">
          <p> {reportData.reportTitle} </p>
        </div>
        <div className="reports">
          <div className="reportsDIV">
            <span className="reportTitle">
              {reportData.reportTitle}
              {reportData.isReportAnonyme ? (
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
              )}
            </span>
            <p className="reportSubject">
              {reportData.reportSubject}, {reportData.reportDate}, à
              {reportData.reportLocationCoords}
            </p>
            <div className="reportMessageDIV">
              <p className="reportMessage"> {reportData.reportMessage} </p>
              <div className="reportMediaAttachement">
                {reportData.reportMediaAttachement
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
            <div>
              <input
                type="text"
                name="sendComment"
                className="commentInput"
                placeholder="Write comment....."
              />
                <FontAwesomeIcon icon={faPaperPlane} className="sendButton" />
            </div>
          </div>
        </div>
        <div className="commentSection">
          <p className="titleComment" onClick={handleCommentSectionCollapse}>
            Comments Section :
            <FontAwesomeIcon
              style={{ paddingLeft: "170px", fontSize: "16px" }}
              icon={commentSectionVisibility}
            />
          </p>
          <div className="commentsOnPost">
            {/* {
              CommentsOnPost.map((comment, index) => (
                <div key={index} className={`post postnumber${index}`}></div>
              ))
            } */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
