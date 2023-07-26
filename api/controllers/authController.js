const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKey = "your_secret_key"; // Choose a secret key for token signing
var sql = require("mssql");
const serverConfig = require("../config");

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
};
