var serverConfig = require('../config.js')
var sql = require("mssql");
const path = require('path');
var fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
var multer = require("multer");

const PaymentScreenshotStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        var userid = req.query.user_id;
        const dir = path.dirname(path.dirname(__dirname)) + `/Docs/Screenshots/${userid}`

        fs.access(dir, (error) => {
            if (error) {
                fs.mkdir(dir, { recursive: true }, (error) => {
                    if (error) {
                        console.error('Error creating directory:', error);
                        cb(error, dir)
                    } else {
                        cb(null, dir)
                    }
                });
            } else {
                cb(null, dir)
            }
        });
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

// Get Requests by User
/*
PARAMETERS :
{
    "param": {
        "user_id": ""
    }
}
*/
exports.getDepositRequests = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("user_id", sql.VarChar, param.user_id);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetDepositRequests", function (err, result) {
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

// Add Deposit Request
/*
PARAMETERS :
{
    "param": {
        "transaction_no": "",
        "user_id": ""
    }
} 
*/
exports.depositRequest = function (req, res) {
    var param = req.query;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("transaction_no", sql.VarChar, param.transaction_no);
            request.input("user_id", sql.VarChar, param.user_id);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("DepositRequest", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message);
                    if (!result.output.Message.startsWith('Error  :')) {
                        const upload = multer({ storage: PaymentScreenshotStorage }).single('files');
                        upload(req, res, function (err) {
                            if (err) {
                                return res.status(500).send("Error uploading file.");
                            }
    
                            return res.status(200).send({
                                message: result.output.Message,
                                data: result.recordset
                            });
                        });
                    } else {
                        return res.status(200).send({
                            message: result.output.Message,
                            data: result.recordset
                        });
                    }
                }
            });
        }
    });
};

// Get Screenshots
/*
PARAMETERS :
{
    "param": {
        "user_id": "",
        "transaction_no": "",
    }
}
*/
exports.getTransactionImage = function (req, res) {
    const directoryPath = path.join(path.dirname(path.dirname(__dirname)), `Docs/Screenshots/${req.body.param.user_id}`);
    
    fs.readdir(directoryPath, (error, fileNames) => {
        if (error) {
            res.status(400).json(error);
            return;
        }

        const files = fileNames.filter(filename => filename.startsWith(req.body.param.transaction_no));
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

// Delete Deposit Request
/*
PARAMETERS :
{
    "param": {
        "request_id": "",
    }
}
*/
exports.deleteDepositRequest = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("request_id", sql.VarChar, param.request_id);
            request.output('user_id', sql.NVarChar(50))
            request.output('transaction_no', sql.NVarChar(50))
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("DeleteDepositRequest", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    const filePath = path.join(path.dirname(path.dirname(__dirname)), `Docs/Screenshots/` + result.output.user_id);

                    fs.readdir(filePath, (readdirErr, files) => {
                        if (readdirErr) {
                            console.error(readdirErr);
                            return res.status(500).send("Error reading directory.");
                        }

                        const matchingFiles = files.filter(file => file.startsWith(result.output.transaction_no));
                        
                        if (matchingFiles.length === 0) {
                            return res.status(404).send("File not found.");
                        }

                        // Delete each matching file
                        matchingFiles.forEach(matchingFile => {
                            const dirpath = path.join(filePath, matchingFile);

                            fs.unlink(dirpath, function (unlinkErr) {
                                if (unlinkErr) {
                                    console.error(unlinkErr);
                                }
                            });
                        });

                        return res.status(200).send({
                            message: result.output.Message,
                            data: result.recordset
                        });
                    });
                }
            });
        }
    });
};

// Get Pending Deposit Requests
exports.getPendingDepositRequests = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetPendingDepositRequests", function (err, result) {
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

// Respond Deposit Request
/*
PARAMETERS :
{
    "param": {
        "request_id": "",
        "status": "",
        "remarks": ""
    }
}
*/
exports.respondDepositRequest = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("request_id", sql.VarChar, param.request_id);
            request.input("status", sql.VarChar, param.status);
            request.input("remarks", sql.VarChar, param.remarks);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("RespondDepositRequest", function (err, result) {
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

// Get Responded Deposit Requests
exports.getRespondedDepositRequests = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetRespondedDepositRequests", function (err, result) {
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