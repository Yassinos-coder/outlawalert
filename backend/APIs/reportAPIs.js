const { Router } = require("express");
const ReportModel = require("../Models/ReportModel");
const UserModel = require("../Models/UserModel");
const { JWT } = require("../Helpers/jwtConfig");
const fs = require("fs");

const reportAPI = Router();

reportAPI.get("/report/GetUserAllReport/:uuid", JWT, async (req, res) => {
  let uuid = req.params.uuid;
  try {
    const UserAllReport = await ReportModel.find({ reporter: uuid });
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
    res.send({
      report: newlyAddedReport,
      message: "success",
    });
  } catch (err) {
    console.warn(`Error in AddReport ${err}`);
    res.send({ message: "failed" });
  }
});

reportAPI.post("/report/UploadMediaOfReports/:userid", JWT, async (req, res) => {
  let files = req.files.allfiles;
  let userid = req.params.userid;
  try {
    let IDTOSTRING = ReportAfterReporting._id.toString() // convert object id to string 
    if (IDTOSTRING !== undefined) {
      if (ReportAfterReporting.isReportAnonyme) {
        // here we upload to the anonyme reports because the report is anonyme
        const dirpathAnonyme = `./Uploads/AnonymeReports/${IDTOSTRING}/`
        if (!fs.existsSync(dirpathAnonyme)) {
          fs.mkdirSync(dirpathAnonyme);
        }   
        await files.forEach((file) => {
          let path = `./Uploads/AnonymeReports/${IDTOSTRING}/${file.name}`;
          file.mv(path, async (err) => {
            if (err) {
              console.warn(err);
            } else {
              await ReportModel.updateOne(
                { _id: IDTOSTRING },
                { $push: { reportMediaAttachement: `AnonymeReports/${IDTOSTRING}/${file.name}` } }
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
          const dirPath = `./Uploads/PublicReports/${username.username}/ReportsMediaAttachement/${IDTOSTRING}`;
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(`./Uploads/PublicReports/${username.username}/ReportsMediaAttachement`, { recursive: true });
            fs.mkdirSync(dirPath);
          }         
          await files.forEach((file) => {
            let path = `./Uploads/PublicReports/${username.username}/ReportsMediaAttachement/${IDTOSTRING}/${file.name}`;
            file.mv(path, async (err) => {
              if (err) {
                console.warn(err);
              } else {
                await ReportModel.updateOne(
                  { _id: IDTOSTRING },
                  { $push: { reportMediaAttachement: `PublicReports/${username.username}/ReportsMediaAttachement/${IDTOSTRING}/${file.name}` } }
                  );
              }
            });
          });
          res.send("uploadSuccess");
        }
      }
    } else {
      console.log('ID UNDEFINED')
    }
  } catch (err) {
    console.log(err)
    console.warn(`Error in UploadMediaOfReports API ${err}`);
  }
});

reportAPI.post("/report/DeleteAllReports/:uuid", JWT, async (req, res) => {
  let uuid = req.params.uuid;
  try {
    await ReportModel.deleteMany({ reporter: uuid });
    const listAfterDelete = await ReportModel.find({reporter: uuid})
    const username = await UserModel.findOne({_id: uuid})
    const path = `./Uploads/PublicReports/${username.username}/ReportsMediaAttachement`
    fs.rmSync(path, { recursive: true, force: true })
    res.send({
      listAfterDelete: listAfterDelete,
      message: 'deleteSuccess'
    });
  } catch (err) {
    console.warn(`Error in DeleteAllReports ${err}`);
    res.send({
      message: 'deleteFailed'
    })
  }
});

reportAPI.get('/report/getAllReport', JWT, async(req ,res) => {
  try {
    const AllReports = await ReportModel.find({})
    res.send(AllReports)
  } catch (err) {
    console.error(`Error in getAllReport API ${err}`)
  }
})

module.exports = reportAPI;
