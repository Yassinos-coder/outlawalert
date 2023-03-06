const { Router } = require("express");
const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const SaltRounds = 10;
const userAPI = Router();
const {JWT} = require('../Helpers/jwtConfig')
const randomString = require('randomstring')

userAPI.post("/user/newUser", async (req, res) => {
  let newUserData = req.body;
  try {
    const DoesUserAlreadyExist = await UserModel.findOne({
      cin: newUserData.cin,
      email: newUserData.email
    });
    if (DoesUserAlreadyExist) {
      res.send("userExists");
    } else {
      // below making username for user as it is not created at sign up in front end
      newUserData.username = newUserData.firstname.toLowerCase()+'.'+newUserData.lastname.toLowerCase()
      // below generate random token for verification of email
      const verifToken = randomString.generate(25)
      newUserData.verificationToken = verifToken
      // below get current time and date to save as expiration date for token 
      const currentTime = new Date();
      const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
      const nextDay = new Date(currentTime.getTime() + oneDay);
      newUserData.tokenExpirationDate = nextDay
      //below hashing password using bcrypt
      const hashedPassword = await bcrypt.hash(newUserData.password, SaltRounds);
      newUserData.password = hashedPassword
      // bellow folder creation for each user
      fs.mkdir(`./Uploads/${newUserData.username}/`, async (err) => {
        if (err) throw err;
        console.log("Directory created successfully");
        const addUser = new UserModel(newUserData)
        await addUser.save();
        console.log("User Inserted !");
        const userDataAfterSignUp = await UserModel.findOne({cin: newUserData.cin})
        res.send({
          tokenVerif : verifToken,
          uuid: userDataAfterSignUp._id,
          message: 'AccountCreatedSuccess'
        });
      });
    }
  } catch (err) {
    res.send('ErrorWhileMakingAccount')
    console.error(`newUser API ERROR => ${err}`);
  }
});

userAPI.post('/user/LogIn', async(req, res) => {
    let loginCreds = req.body
    try {
        const isUserLegit = await UserModel.findOne({cin: loginCreds.cin})
        if (isUserLegit) {
            const result = await bcrypt.compare(loginCreds.password, isUserLegit.password)
            if (result === true) {
                const jwtToken = jsonwebtoken.sign(isUserLegit.username, process.env.ACCESS_TOKEN)
                res.send({
                  token: jwtToken,
                  userData: isUserLegit,
                  giveAccess: true
                })
            } else {
              res.send({
                message:'WrongPass',
                giveAccess: false
              })
            }
        }else{
            res.send('UserNoExist')
        }

    } catch (err) {
        console.error(`Error in logIn API ${err}`)
    }
})

userAPI.post('/user/VerificationProcess/:userid/:token', async(req, res) => {
  let uuid = req.params.userid
  let tokenVerif = req.params.token
  const currentTime = new Date();
  try {
    const islegitForVerif = await UserModel.findOne({verificationToken: tokenVerif, _id: uuid})
    if (islegitForVerif) {
      const isTokenExpired = await UserModel.findOne({_id: uuid, tokenExpirationDate: currentTime})
      if (isTokenExpired) {
        res.send('tokenExpired')
      } else {
        res.send('userIsVerified')
      }
    } else {
      res.send('userDoesNotExist')
    }
  } catch (err) {
    console.error(`Error in VerificationProcess API ${err}`)
  }
})

module.exports = userAPI;
