const mongoose = require('mongoose')
const db = require('mongoose')

const passwordresetmodel = db.Schema({
    resetRequestOwner:{
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    dateOfRequest : {
        type: String,
        required: true
    }

})

const PasswordResetModel = mongoose.model('PasswordResetRequests', passwordresetmodel)
module.exports = PasswordResetModel