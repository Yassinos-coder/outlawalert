const mongoose  = require('mongoose')
const db = require('mongoose')

const userModel = db.Schema({
    avatar : {
        type: String,
        required: true
    },
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    cin : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    phonenumber : {
        type: Number,
        required: true
    },
    dob : {
        type: String,
        required: true
    },
    verificationToken : {
        type: String,
        required: true
    },
    tokenExpirationDate : {
        type: String,
        required: true
    },
    isVerified : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
})

const UserModel = mongoose.model('users', userModel)
module.exports = UserModel