const { Router } = require("express");
const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const SaltRounds = 10;
const userAPI = Router();
const { JWT } = require("../Helpers/jwtConfig");
const randomString = require("randomstring");
const nodemailer = require("nodemailer");
const axios = require('axios');


const newLoginNoticeOnEmail = async (emailRecipient) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "smp.newpass@gmail.com",
      pass: "tisomxygifswljec",
    },
  });
  const ipaddress = await axios.get('https://api.ipify.org', (req, res) => {return res})
  const ipInfo = await axios.get(`http://api.ipstack.com/${ipaddress.data}?access_key=a2189b78e421fd72cd5cd1b44a528e15`, (req, res) => {return res})

  // send email using the transporter
  let mailOptions = {
    from: "smp.newpass@gmail.com",
    to: emailRecipient,
    subject: "New Connection Detected ⚠️!",
    html: `<h1 style='background-color: red;border-radius: 10px; margin:auto; text-align: center; max-width: 500px;'>New Connection Detected</h1><h3>We detected a new login from this IP Address: ${ipInfo.data.ip} located in ${ipInfo.data.city}, ${ipInfo.data.region_name}, ${ipInfo.data.country_name} ${ipInfo.data.location.country_flag_emoji}, ${ipInfo.data.continent_name} </h3>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
};


userAPI.post("/user/newUser", async (req, res) => {
  let newUserData = req.body;
  try {
    const DoesUserAlreadyExist = await UserModel.findOne({
      cin: newUserData.cin,
      email: newUserData.email,
    });
    if (DoesUserAlreadyExist) {
      res.send("userExists");
    } else {
      // below making username for user as it is not created at sign up in front end
      newUserData.username =
        newUserData.firstname.toLowerCase() +
        "." +
        newUserData.lastname.toLowerCase();
      //below makes cin identifier lowercase
      newUserData.cin = newUserData.cin.toLowerCase();
      // below generate random token for verification of email
      const verifToken = randomString.generate(25);
      newUserData.verificationToken = verifToken;
      // below get current time and date to save as expiration date for token
      const currentTime = new Date();
      const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
      const nextDay = new Date(currentTime.getTime() + oneDay);
      newUserData.tokenExpirationDate = nextDay;
      //below hashing password using bcrypt
      const hashedPassword = await bcrypt.hash(
        newUserData.password,
        SaltRounds
      );
      newUserData.password = hashedPassword;
      // bellow folder creation for each user
      fs.mkdir(`./Uploads/${newUserData.username}/`, async (err) => {
        if (err) throw err;
        console.log("Directory created successfully");
        const addUser = new UserModel(newUserData);
        await addUser.save();
        console.log("User Inserted !");
        const userDataAfterSignUp = await UserModel.findOne({
          cin: newUserData.cin,
        });
        res.send({
          tokenVerif: verifToken,
          uuid: userDataAfterSignUp._id,
          message: "AccountCreatedSuccess",
        });
      });
    }
  } catch (err) {
    res.send("ErrorWhileMakingAccount");
    console.error(`newUser API ERROR => ${err}`);
  }
});

userAPI.post("/user/LogIn", async (req, res) => {
  let loginCreds = req.body;
  try {
    const isUserLegit = await UserModel.findOne({ cin: loginCreds.cin });
    if (isUserLegit) {
      const result = await bcrypt.compare(
        loginCreds.password,
        isUserLegit.password
      );
      if (result === true) {
        const jwtToken = jsonwebtoken.sign(
          isUserLegit.username,
          process.env.ACCESS_TOKEN
        );
        newLoginNoticeOnEmail(isUserLegit.email)
        res.send({
          token: jwtToken,
          userData: isUserLegit,
          giveAccess: true,
        });
      } else {
        res.send({
          message: "WrongPass",
          giveAccess: false,
        });
      }
    } else {
      res.send("UserNoExist");
    }
  } catch (err) {
    console.error(`Error in logIn API ${err}`);
  }
});

module.exports = userAPI;
