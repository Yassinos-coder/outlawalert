const { Router } = require("express");
const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const SaltRounds = 10;
const userAPI = Router();
const {JWT} = require('../Helpers/jwtConfig')

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
      newUserData.username = newUserData.firstname.toLowerCase()+'.'+newUserData.lastname.toLowerCase()
      const hashedPassword = await bcrypt.hash(newUserData.password, SaltRounds);
      newUserData.password = hashedPassword
      const addUser = new UserModel(newUserData)
      await addUser.save();
      fs.mkdir(`./Uploads/${newUserData.username}/`, (err) => {
        if (err) throw err;
        console.log("Directory created successfully");
      });
      console.log("User Inserted !");
      res.send("AccountCreatedSuccess");
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

module.exports = userAPI;
