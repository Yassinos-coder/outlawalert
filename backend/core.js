const express = require('express')
const mongoose  = require("mongoose")
const fileupload = require("express-fileupload")
const cors = require('cors')
require('dotenv').config()

const userAPIRouter = require('./APIs/userAPIs')
const reportAPI = require('./APIs/reportAPIs')
const CommentsOnPostAPI = require('./APIs/CommentsAPI')

let db_connection_success;
const app = express()

app.use(express.static('uploads'))
app.use(express.json())
app.use(cors())
app.use(fileupload())
app.listen(process.env.BACK_END, ()=> console.info(`Server Up and running on port ${process.env.BACK_END}`))
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.info('Database connection granted');
    db_connection_success = true
}).catch(error => {
    db_connection_success = false
    console.warn('Database connection error:', error.message);
});


app.use(userAPIRouter)
app.use(reportAPI)
app.use(CommentsOnPostAPI)

app.get('/backStatus', async(req, res) => {
    if (db_connection_success === true) {
        res.send({
            db: true,
            server: true
        })
    } else if (db_connection_success === false) {
        res.send({
            db: false,
            server: true
        })
    } else {
        res.send({
            db: false,
            server: false
        })
    }
})