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

const newNoticeOnEmail = async (emailRecipient, message, subject) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "sactroanonymous@Gmail.com",
      pass: "cdsmmaxyejpdngdm",
    },
  });
  // const ipaddress = await axios.get('https://api.ipify.org', (req, res) => {return res})
  //const ipInfo = await axios.get(`http://api.ipstack.com/${ipaddress.data}?access_key=a2189b78e421fd72cd5cd1b44a528e15`, (req, res) => //{return res})

  // send email using the transporter
  let mailOptions = {
    from: "smp.newpass@gmail.com",
    to: emailRecipient,
    subject: subject,
    html: message,
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
      const userTokenGen = randomString.generate(32);
      newUserData.userToken = userTokenGen;
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
      fs.mkdir(`./Uploads/Users/${newUserData.username}/`, async (err) => {
        if (err) throw err;
        console.log("Directory created successfully");
        const addUser = new UserModel(newUserData);
        await addUser.save();
        console.log("User Inserted !");
        const userDataAfterSignUp = await UserModel.findOne({
          cin: newUserData.cin,
        });
        res.send({
          tokenVerif: userTokenGen,
          uuid: userDataAfterSignUp._id,
          message: "AccountCreatedSuccess",
        });
      });
    }
  } catch (err) {
    res.send("ErrorWhileMakingAccount");
    console.warn(`newUser API ERROR => ${err}`);
  }
});

userAPI.get("/user/GetUserData/:uuid", async (req, res) => {
  let uuid = req.params.uuid;
  try {
    const userData = await UserModel.findOne({ _id: uuid });
    res.send(userData);
  } catch (err) {
    console.error(`Error in GetUserData API ${err}`);
  }
});

userAPI.post("/user/LogIn", async (req, res) => {
  let loginCreds = req.body;
  //let mailSubject = "New Connection Detected ⚠️!";
  //let htmlMsg = `<h1 style='background-color: red;border-radius: 10px; margin:auto; text-align: center; max-width: 500px;'>New Connection Detected</h1><h3>We detected a new login from this IP Address: ${ipInfo.data.ip} located in ${ipInfo.data.city}, ${ipInfo.data.region_name}, ${ipInfo.data.country_name} ${ipInfo.data.location.country_flag_emoji}, ${ipInfo.data.continent_name} </h3>`;

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
        // newNoticeOnEmail(isUserLegit.email, htmlMsg, mailSubject);
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
    console.warn(`Error in logIn API ${err}`);
  }
});

userAPI.post("/user/ProfilePictureUpdate/:uuid", JWT, async (req, res) => {
  let userid = req.params.uuid;
  let newPicture = req.files.newPicture;
  try {
    const userData = await UserModel.findOne({ _id: userid });
    const dirUserpath = `./Uploads/UsersProfilePics/${userData.username}/`;
    if (!fs.existsSync(dirUserpath)) {
      fs.mkdirSync(dirUserpath);
    }
    let SplitnewPictureName = newPicture.name.split(".");
    SplitnewPictureName = `${userData._id}.${SplitnewPictureName[1]}`;
    newPicture.name = SplitnewPictureName;
    let saveToPath = `./Uploads/UsersProfilePics/${userData.username}/${newPicture.name}`;
    newPicture.mv(saveToPath, async (err) => {
      if (err) {
        console.error(`Error in mv Func ${err}`);
        res.send({
          message: "updateFailed",
        });
      } else {
        await UserModel.updateOne({ _id: userid }, { avatar: newPicture.name });
        res.send({
          message: "updateSuccess",
        });
      }
    });
  } catch (error) {
    console.error(`Error in uploadPic API ${err}`);
    res.send({
      message: "updateFailed",
    });
  }
});

userAPI.post("/user/DeleteProfilePicture/:uuid", JWT, async (req, res) => {
  let uuid = req.params.uuid;
  try {
    const userData = await UserModel.findOne({ _id: uuid });
    await UserModel.updateOne({ _id: uuid }, { avatar: "noavatar" });
    let path = `./Uploads/UsersProfilePics/${userData.username}/${userData.avatar}`;
    fs.rmSync(path, { recursive: true, force: true });
    res.send({ message: "deleteSuccess" });
  } catch (err) {
    console.error(`Error in DeleteProfilePicture ${err}`);
    res.send({ message: "deleteFail" });
  }
});

userAPI.post("/user/EmailUpdate/:uuid", JWT, async (req, res) => {
  let uuid = req.params.uuid;
  let newEmailData = req.body;
  try {
    await UserModel.updateOne({ _id: uuid }, { email: newEmailData.email });
    res.send({ message: "emailUpdateSuccess" });
  } catch (err) {
    console.error(`Error in EmailUpdate ${err}`);
    res.send({ message: "emailUpdateFail" });
  }
});

userAPI.post("/user/PasswordUpdate/:uuid", async (req, res) => {
  let uuid = req.params.uuid;
  let PassData = req.body;
  try {
    console.log(PassData);
    const userData = await UserModel.findOne({ _id: uuid });
    const result = bcrypt.compareSync(PassData.oldpass, userData.password);
    if (result) {
      const newHashedPass = bcrypt.hashSync(PassData.newpass, SaltRounds);
      await UserModel.updateOne({ _id: uuid }, { password: newHashedPass });
      res.send({ message: "passUpdateSuccess" });
    } else if (!result) {
      res.send({ message: "oldPassWrong" });
    }
  } catch (err) {
    console.error(`Error in PasswordUpdate API ${err}`);
    res.send({ message: "SomethingWentWrong" });
  }
});

userAPI.post("/user/DeleteAccount/:uuid", async (req, res) => {
  let uuid = req.params.uuid;
  try {
    const userData = await UserModel.findOne({ _id: uuid });
    await UserModel.deleteOne({ _id: uuid });
    let path = `./Uploads/Users/${userData.username}`;
    fs.rmSync(path, { recursive: true, force: true });
    res.send({ message: "UserDeleteSuccess" });
  } catch (err) {
    console.error(`Error in DeleteAccount ${err}`);
    res.send({ message: "UserDeleteFailed" });
  }
});

userAPI.post("/user/RequestPasswordReset/:cin", async (req, res) => {
  let userCIN = req.params.cin.toLowerCase();
  try {
    console.log(userCIN);
    const userData = await UserModel.findOne({ cin: userCIN });
    let passResetLink = `http://localhost:3000/resetCredentials/${userData._id}/${userData.userToken}`;
    let mailSubject = "Password Reset Request";
    let htmlMsg = `<h1 style='background-color: red;border-radius: 10px; margin:auto; text-align: center; max-width: 500px;'>Password Reset Request </h1><h3>Here is your password reset link for the account with ${userData.email} Email Address => <a href=${passResetLink}> Reset Password</a> </h3>`;
    newNoticeOnEmail(userData.email, htmlMsg, mailSubject);
    res.send({ message: "requestSent" });
  } catch (err) {
    console.error(`Error in RequestPasswordReset API,  ${err}`);
    res.send({ message: "requestFailed" });
  }
});

userAPI.get("/user/checkUserForPasswordReset/:uuid", async (req, res) => {
  let uuid = req.params.uuid;
  try {
    const result = await UserModel.findOne({ _id: uuid });
    if (result) {
      res.send({ message: "UserAllowed" });
    }
  } catch (err) {
    res.send({ message: "userNotAllowed" });
  }
});

userAPI.post(
  "/user/PasswordResetExecution/:uuid/:userToken",
  async (req, res) => {
    let uuid = req.params.uuid;
    let userToken = req.params.userToken;
    let NewPassData = req.body;

    try {
      let mailSubject = "Password Reset Successful !";
      let htmlMsg = `<h1 style='background-color: red;border-radius: 10px; margin:auto; text-align: center; max-width: 500px;'>Password Reset Successful </h1><h3>You have successfully changed your password !</h3>`;

      if (req.hostname === "192.168.4.4") {
        const userDoesExist = await UserModel.findOne({ _id: uuid });
        if (userDoesExist) {
          if (
            userToken === userDoesExist.userToken &&
            uuid === userDoesExist._id.toString().slice(-24)
          ) {
            const hashedNewPass = bcrypt.hashSync(
              NewPassData.password,
              SaltRounds
            );
            await UserModel.updateOne(
              { _id: uuid },
              { password: hashedNewPass }
            );
            newNoticeOnEmail(userDoesExist.email, htmlMsg, mailSubject);
            res.send("PassUpdateSuccess");
          } else {
            res.send("BigErrorRetry");
            console.error(`Error in PasswordResetExecution API 1`);
          }
        } else {
          res.send("UserDoesNotExist");
          console.error(`Error in PasswordResetExecution API 2`);
        }
      } else {
        res.send("BigError");
        console.error(`Error in PasswordResetExecution API 3`);
      }
    } catch (err) {
      console.error(`Error in PasswordResetExecution API ${err}`);
    }
  }
);

module.exports = userAPI;
