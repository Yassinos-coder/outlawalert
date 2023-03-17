const { Router } = require("express");
const ReportModel = require("../Models/ReportModel");
const UserModel = require("../Models/UserModel");
const { JWT } = require("../Helpers/jwtConfig");
const fs = require("fs");

const reportAPI = Router();

reportAPI.get("/report/GetUserAllReport", JWT, async (req, res) => {
  let uuid = req.body;
  try {
    const UserAllReport = await ReportModel.findOne({ reporter: uuid });
    if (UserAllReport) {
      res.send(UserAllReport);
    } else {
      res.send("NoReport");
    }
  } catch (err) {
    console.warn(`Error in GetUserAllReport ${err}`);
  }
});

let ReportAfterReporting;
reportAPI.post("/report/AddReport", JWT, async (req, res) => {
  let newReport = req.body;
  try {
    const addNewReport = new ReportModel(newReport);
    const newlyAddedReport = await addNewReport.save();
    ReportAfterReporting = await newlyAddedReport;
    console.log(ReportAfterReporting);
    res.send({
      report: newlyAddedReport,
      message: "success",
    });
  } catch (err) {
    console.warn(`Error in AddReport ${err}`);
    res.send({ message: "failed" });
  }
});

reportAPI.post("/report/UploadMediaOfReports/:userid", async (req, res) => {
  let files = req.files.allfiles;
  let userid = req.params.userid;
  try {
    console.log(ReportAfterReporting);
    if (ReportAfterReporting.isReportAnonyme) {
      // here we upload to the anonyme reports because the report is anonyme
      fs.mkdirSync(`./Uploads/AnonymeReports/${ReportAfterReporting._id}/`);
      await files.forEach((file) => {
        let path = `./Uploads/AnonymeReports/${ReportAfterReporting._id}/${file.name}`;
        file.mv(path, async (err) => {
          if (err) {
            console.warn(err);
          } else {
            await ReportModel.updateOne(
              { _id: ReportAfterReporting._id },
              { $push: { reportMediaAttachement: path } }
            );
          }
        });
      });
      res.send("uploadSuccess");
    } else {
      // here we upload to the public reports because the report is not anonyme
      const username = await UserModel.findOne({ _id: userid });
      if (username === null) {
        res.send("ErrorOnFileUpload");
      } else {
        fs.mkdirSync(
          `./Uploads/PublicReports/${username.username}/ReportsMediaAttachement/${ReportAfterReporting._id}/`
        );
        await files.forEach((file) => {
          let path = `./Uploads/PublicReports/${username.username}/ReportsMediaAttachement/${ReportAfterReporting._id}/${file.name}`;
          file.mv(path, async (err) => {
            if (err) {
              console.warn(err);
            } else {
              await ReportModel.updateOne(
                { _id: ReportAfterReporting._id },
                { $push: { reportMediaAttachement: path } }
              );
            }
          });
        });
        res.send("uploadSuccess");
      }
    }
  } catch (err) {
    console.warn(`Error in UploadMediaOfReports API ${err}`);
  }
});

reportAPI.post("/report/DeleteAllReports", JWT, async (req, res) => {
  let uuid = req.body;
  try {
    await ReportModel.deleteMany({ reporter: uuid });
    res.send("AllDeletedSuccess");
  } catch (err) {
    console.warn(`Error in DeleteAllReports ${err}`);
  }
});

module.exports = reportAPI;
