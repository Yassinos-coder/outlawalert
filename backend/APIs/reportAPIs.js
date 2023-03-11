const {Router} = require('express')
const ReportModel = require('../Models/ReportModel')
const UserModel = require('../Models/UserModel')
const {JWT} = require('../Helpers/jwtConfig')

const reportAPI = Router()

reportAPI.get('/report/GetUserAllReport', JWT, async(req, res) => {
    let uuid = req.body 
    try {
        const UserAllReport = await ReportModel.findOne({reporter: uuid})
        if (UserAllReport) {
            res.send(UserAllReport)
        } else {
            res.send('NoReport')
        }
    } catch (err) {
        console.error(`Error in GetUserAllReport ${err}`)
    }
})

reportAPI.post('/report/AddReport', JWT, async(req, res) => {
    let newReport = req.body
    try {
        const addNewReport = new ReportModel(newReport)
        await addNewReport.save()
        res.send('reportAddedSuccess')
    } catch (err) {
        console.error(`Error in AddReport ${err}`)
    }
})

reportAPI.post('/report/DeleteAllReports', JWT, async(req, res)=> {
    let uuid = req.body
    try {
        await ReportModel.deleteMany({reporter: uuid})
        res.send('AllDeletedSuccess')
    } catch (err) {
        console.error(`Error in DeleteAllReports ${err}`)
    }
})

module.exports = reportAPI