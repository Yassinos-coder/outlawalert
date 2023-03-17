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

let ReportIdAfterReporting;

reportAPI.post("/report/AddReport", JWT, async (req, res) => {
  let newReport = req.body;
  try {
    const addNewReport = new ReportModel(newReport);
    const newlyAddedReport = await addNewReport.save();
    ReportIdAfterReporting = await newlyAddedReport._id;
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
  const report = await ReportModel.findOne({ _id: ReportIdAfterReporting });
  try {
    if (report.isReportAnonyme) {
      await files.forEach((file) => {
        let path = `./uploads/AnonymeReports/${ReportIdAfterReporting}/${file.name}`;
        file.mv(path, async (err) => {
          if (err) {
            console.warn(err);
          } else {
            await ReportModel.updateOne(
              { _id: ReportIdAfterReporting },
              { $push: { reportMediaAttachement: path } }
            );
          }
        });
      });
      res.send("uploadSuccess");
    } else {
      const username = await UserModel.findOne({ _id: userid });
      if (username === null) {
        res.send("ErrorOnFileUpload");
      } else {
        fs.mkdirSync(
          `./uploads/${username.username}/ReportsMediaAttachement/${ReportIdAfterReporting}/`
        );
        await files.forEach((file) => {
          let path = `./uploads/${username.username}/ReportsMediaAttachement/${ReportIdAfterReporting}/${file.name}`;
          file.mv(path, async (err) => {
            if (err) {
              console.warn(err);
            } else {
              await ReportModel.updateOne(
                { _id: ReportIdAfterReporting },
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
