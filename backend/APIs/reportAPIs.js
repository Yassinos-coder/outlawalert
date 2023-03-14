const { Router } = require("express");
const ReportModel = require("../Models/ReportModel");
const UserModel = require("../Models/UserModel");
const { JWT } = require("../Helpers/jwtConfig");

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
    console.error(`Error in GetUserAllReport ${err}`);
  }
});

reportAPI.post("/report/AddReport", JWT, async (req, res) => {
  let newReport = req.body;
  try {
    console.log(req.body);
    const addNewReport = new ReportModel(newReport);
    const newlyAddedReport = await addNewReport.save();
    res.send({
        report : newlyAddedReport,
        message: 'success'
    });
  } catch (err) {
    console.error(`Error in AddReport ${err}`);
  }
});

reportAPI.post("/report/UploadMediaOfReports/:userid/:reportID", async (req, res) => {
  let files = req.files.allfiles;
  let userid = req.params.userid;
  try {
    const username = await UserModel.findOne({ _id: userid });
    if (username === null) {
      res.send("ErrorOnFileUpload");
    } else {
      files.forEach((file) => {
        file.mv(
          `./uploads/${username.username}/ReportsMediaAttachement/${file.name}`,
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            }
          }
        );
      });
      res.send('uploadSuccess')
    }
  } catch (err) {
    console.error(`Error in UploadMediaOfReports API ${err}`);
  }
});

reportAPI.post("/report/DeleteAllReports", JWT, async (req, res) => {
  let uuid = req.body;
  try {
    await ReportModel.deleteMany({ reporter: uuid });
    res.send("AllDeletedSuccess");
  } catch (err) {
    console.error(`Error in DeleteAllReports ${err}`);
  }
});

module.exports = reportAPI;
