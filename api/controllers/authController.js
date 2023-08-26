const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = "your_secret_key"; // Choose a secret key for token signing
var sql = require("mssql");
require('dotenv').config();
const serverConfig = require("../config");
const nodemailer=require('nodemailer');

var email;
var otpDictionary = {};

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: 'Gmail',

  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASS,
  }
});

function sendOTP(req, res) {
  var otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);

  // send mail with defined transport object
  var mailOptions = {
    to: req.body.param.email,
    subject: "Physics Marketing - Password Reset",
    html: `
    <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f4f4f4">
      <tr>
          <td>
              <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; padding: 20px;">
                  <tr>
                      <td align="center" style="padding: 20px;">
                          <h1>Physics Marketing</h1>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding: 0 20px;">
                          <p>Hello ${req.body.param.username},</p>
                          <p>We received a request to reset your password. Please use the following One-Time Password (OTP) to reset your password:</p>
                          <p style="font-size: 24px; font-weight: bold; color: #ef8157;">${otp}</p>
                          <p>This OTP is valid for 5 minutes. If you did not request a password reset, please ignore this email.</p>
                          <p>Thank you,</p>
                          <p>Physics Marketing</p>
                      </td>
                  </tr>
                  <tr>
                      <td align="center" style="padding: 20px;">
                          <a style="font-size: 12px; color: #999;">https://physicsmarketing.online/</p>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
    </table>
  `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    otpDictionary[req.body.param.username] = otp
    res.send(true)
    setTimeout(() => {
      delete otpDictionary[req.body.param.username];
    }, 5 * 60 * 1000);
  });
}

function verifyOTP(req,res) {
  if (req.body.param.otp==otpDictionary[req.body.param.username]){
      res.send({ data: true });
  } else {
      res.send({ data: false });
  }
}  

// Generate an access token
function generateToken(user, isAdmin) {
  return jwt.sign({ username: user, isAdmin: isAdmin }, secretKey, { expiresIn: "1h" }); // Token expiration time is 1 hour
}

// Authenticate User
function authenticateUser(param, callback) {
  // Connect to the SQL Server
  sql.connect(serverConfig, (err) => {
    if (err) {
      console.log(err);
      return callback({ message: "Database connection error." });
    }

    // Create a new SQL Server request object
    const request = new sql.Request();

    // Set up the parameters for the stored procedure
    request.input("username", sql.VarChar(50), param.username);
    request.input("password", sql.VarChar(50), param.password);
    request.output("Message", sql.NVarChar(sql.MAX));

    // Execute the stored procedure
    request.execute("ValidateUserLogin", (err, result) => {
      if (err) {
        console.log(err);
        return callback({
          message: "Error : cannot execute the stored procedure.",
        });
      }

      // Check the authentication result from the stored procedure
      const metadata = {
        username: param.username,
        isAdmin: result.output.Message === "Info  : Admin validated",
        isAuthenticated:
          result.output.Message === "Info  : Admin validated" ||
          result.output.Message === "Info  : Login validated",
      };
      return callback(null, metadata);
    });
  });
}

module.exports = {
  generateToken,
  authenticateUser,
  sendOTP,
  verifyOTP
};
