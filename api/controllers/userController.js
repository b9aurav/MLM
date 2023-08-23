var serverConfig = require('../config.js')
var sql = require("mssql");
var auth = require('./authController.js')
const path = require('path');
var fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

// Get Users
exports.getUsers = function (req, res) {
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetUsers", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: result.recordset
                    });
                }
            });
        }
    });
};

// Get User Details
/*
PARAMETERS :
{
    "param": {
        "username": ""
    }
}
*/
exports.getUserDetails = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("username", sql.VarChar, param.username);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetUserDetails", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: result.recordset
                    });
                }
            });
        }
    });
};

// Get User Details by User ID
/*
PARAMETERS :
{
    "param": {
        "user_id": ""
    }
}
*/
exports.getUserDetailsByUserID = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("user_id", sql.NVarChar(50), param.user_id);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetUserDetailsByUserID", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: result.recordset
                    });
                }
            });
        }
    });
};

// Add User
/*
PARAMETERS :
{
    "param": {
        "username": "",
        "name": "",
        "phone": ,
        "email": "",
        "sponsor_id": "",
        "password": "",
        "pin": ""
    }
} 
*/
exports.addUser = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("username", sql.VarChar, param.username);
            request.input("name", sql.VarChar, param.name);
            request.input("phone", sql.VarChar, param.phone);
            request.input("email", sql.VarChar, param.email);
            request.input("sponsor_id", sql.VarChar, param.sponsor_id);
            request.input("password", sql.VarChar, param.password);
            request.input("pin", sql.VarChar, param.pin);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("AddUser", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: result.recordset
                    });
                }
            });
        }
    });
};

// Change Password
/*
PARAMETERS :
{
    "param": {
        "username": "",
        "OldPassword": "",
        "NewPassword": ""
    }
}
*/
exports.changeUserPassword = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("username", sql.VarChar, param.username);
            request.input("OldPassword", sql.VarChar, param.OldPassword);
            request.input("NewPassword", sql.VarChar, param.NewPassword);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("ChangeUserPassword", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: result.recordset
                    });
                }
            });
        }
    });
};

// Validate User
/*
PARAMETERS :
{
    "param": {
        "username": "",
        "password": ""
    }
}
*/
exports.validateUser = function (req, res) {
  // Authenticate the user
  auth.authenticateUser(req.body.param, (err, metadata) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    
    // Generate and send the access token
    const token = auth.generateToken(metadata.username, metadata.isAdmin);
    return res.status(200).send({ token: token, metadata: metadata });
  });
};

// KYC Request
/*
PARAMETERS :
{
    "param": {
        "userid": "",
        "bank_ac_holder_name": "",
        "ifsc": "",
        "bank_name": "",
        "branch": "",
        "ac_no": "",
        "pan_no": "",
        "aadhar_no": ""
    }
}
*/
exports.KYCRequest = function (req, res) {
    param = req.query;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("userid", sql.VarChar, param.userid);
            request.input("bank_ac_holder_name", sql.VarChar, param.bank_ac_holder_name);
            request.input("ifsc", sql.VarChar, param.ifsc);
            request.input("bank_name", sql.VarChar, param.bank_name);
            request.input("branch", sql.VarChar, param.branch);
            request.input("ac_no", sql.VarChar, param.ac_no);
            request.input("pan_no", sql.VarChar, param.pan_no);
            request.input("aadhar_no", sql.VarChar, param.aadhar_no);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("KYCRequest", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: result.recordset
                    });
                }
            });
        }
    });
};

// Get Pending KYC Requests
exports.getPendingKYCRequests = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetPendingKYCRequests", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: result.recordset
                    });
                }
            });
        }
    });
};

// Get KYC Docs
/*
PARAMETERS :
{
    "param": {
        "user_id": "",
    }
}
*/
exports.getKYCDocuments = function (req, res) {
    const directoryPath = path.join(path.dirname(path.dirname(__dirname)), `Docs/KYC/${req.body.param.user_id}`);
    
    fs.readdir(directoryPath, (error, fileNames) => {
        if (error) {
            res.status(400).json(error);
            return;
        }

        const files = fileNames.filter(filename => filename.endsWith('.jpg'));
        const promises = files.map(function (filename) {
            const filepath = path.join(directoryPath, filename);
            return readFileAsync(filepath)
                .then(fileContent => {
                    return {
                        file: fileContent,
                        document: filename,
                    };
                })
                .catch(error => {
                    console.error(`Error reading file ${filename}:`, error);
                    return null;
                });
        });

        Promise.all(promises)
            .then(fileContents => {
                res.json({ files: fileContents });
            })
            .catch(error => {
                res.status(400).json(error);
            });
    });
};

// Approve KYC
/*
PARAMETERS :
{
    "param": {
        "user_id": "",
    }
}
*/
exports.approveKYC = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("user_id", sql.VarChar, param.user_id);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("ApproveKYC", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: result.recordset
                    });
                }
            });
        }
    });
};

// Revoke KYC
/*
PARAMETERS :
{
    "param": {
        "user_id": "",
    }
}
*/
exports.revokeKYC = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("user_id", sql.VarChar, param.user_id);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("RevokeKYC", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: result.recordset
                    });
                }
            });
        }
    });
};

// Get Approved KYC
exports.getApprovedKYCRequests = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetApprovedKYCRequests", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: result.recordset
                    });
                }
            });
        }
    });
};

// Deactivate User Account
/*
PARAMETERS :
{
    "param": {
        "user_id": "",
    }
}
*/
exports.deactivateUser = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("user_id", sql.VarChar, param.user_id);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("DeactivateUser", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: result.recordset
                    });
                }
            });
        }
    });
};

// Activate User Account
/*
PARAMETERS :
{
    "param": {
        "user_id": "",
    }
}
*/
exports.activateUser = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("user_id", sql.VarChar, param.user_id);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("ActivateUser", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: result.recordset
                    });
                }
            });
        }
    });
};

// Get User details for Admin
/*
PARAMETERS :
{
    "param": {
        "user_id": "",
    }
}
*/
exports.getUserDetailsForAdmin = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("user_id", sql.NVarChar, param.user_id);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetUserDetailsForAdmin", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: result.recordsets[result.recordsets.length - 1]
                    });
                }
            });
        }
    });
};

// Fetch Dashboard Info
/*
PARAMETERS :
{
    "param": {
        "user_id": "",
    }
}
*/
exports.getDashboardData = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("user_id", sql.NVarChar, param.user_id);
            request.output('availableBal', sql.BigInt);
            request.output('directMembers', sql.Int);
            request.output('directEarnings', sql.BigInt);
            request.output('levelEarnings', sql.BigInt);
            request.output('autopoolLevel', sql.Int);
            request.output('autopoolReward', sql.NVarChar(50));
            request.output('eduReward', sql.NVarChar(50));
            request.output('eduRank', sql.NVarChar(30));
            request.output('giftReward', sql.NVarChar(50));
            request.output('giftRewardRank', sql.NVarChar(30));
            request.output('digitalToken', sql.Float)
            request.output('Message', sql.NVarChar(sql.MAX));
            request.execute("GetDashboardData", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        availableBal: result.output.availableBal,
                        directMembers: result.output.directMembers,
                        directEarnings: result.output.directEarnings,
                        levelEarnings: result.output.levelEarnings,
                        autopoolLevel: result.output.autopoolLevel,
                        autopoolReward: result.output.autopoolReward,
                        eduReward: result.output.eduReward,
                        eduRank: result.output.eduRank,
                        giftReward: result.output.giftReward,
                        giftRewardRank: result.output.giftRewardRank,
                        digitalToken: result.output.digitalToken,
                        data: result.recordsets[result.recordsets.length - 1]
                    });
                }
            });
        }
    });
};

// Get User Balance
/*
PARAMETERS :
{
    "param": {
        "user_id": "",
    }
}
*/
exports.getBalance = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("user_id", sql.NVarChar, param.user_id);
            request.output('withdrawableBalance', sql.BigInt)
            request.output('available_balance', sql.BigInt)
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetBalance", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        withdrawable_balance: result.output.withdrawableBalance,
                        available_balance: result.output.available_balance, 
                        data: result.recordsets[result.recordsets.length - 1]
                    });
                }
            });
        }
    });
};
