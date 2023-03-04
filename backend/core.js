const express = require('express')
const mongoose  = require("mongoose")
const fileupload = require("express-fileupload")
const cors = require('cors')
require('dotenv').config()

const userAPIRouter = require('./APIs/userAPIs')

let db_connection_success;
const app = express()

app.use(express.static('uploads'))
app.use(express.json())
app.use(cors())
app.use(fileupload())
app.listen(process.env.BACK_END, ()=> console.info(`Server Up and running on port ${process.env.BACK_END}`))
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, ()=> 
    {db_connection_success = true
    console.info('Database connection granted')
})

app.use(userAPIRouter)