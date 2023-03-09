const mongoose  = require('mongoose')
const db = require('mongoose')

const reportModel = db.Schema({
    reporter : {
        type: mongoose.Types.ObjectId,
        ref:'users',
        required: true,
    },
    reportSubject : {
        type: String,
        required: true,
    },
    reportMessage : {
        type: String,
        required: true,
    },
    reportMediaAttachement: {
        type: Array,
        required: false,
    },
    reportLocationCoords:{
        type: String,
        required: true
    }
})

const ReportModel = mongoose.model('Reports', reportModel)
module.exports = ReportModel