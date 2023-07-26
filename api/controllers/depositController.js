var serverConfig = require('../config.js')
var sql = require("mssql");

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
    var param = req.body.param;
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
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("DeleteDepositRequest", function (err, result) {
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
        "amount": "",
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
            request.input("amount", sql.VarChar, param.amount);
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