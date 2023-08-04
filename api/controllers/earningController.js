var serverConfig = require('../config.js')
var sql = require("mssql");

// Get Direct Earnings
/*
PARAMETERS :
{
    "param": {
        "user_id": ""
    }
}
*/
exports.getDirectEarnings = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("user_id", sql.VarChar, param.user_id);
            request.output('referrals', sql.NVarChar(sql.MAX))
            request.output('earnings', sql.NVarChar(sql.MAX))
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetDirectEarnings", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        referrals: result.output.referrals,
                        earnings: result.output.earnings,
                        data: result.recordset
                    });
                }
            });
        }
    });
};

// Get Level Earnings
/*
PARAMETERS :
{
    "param": {
        "user_id": "",
    }
}
*/
exports.getIncomeByLevel = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("user_id", sql.VarChar, param.user_id);
            request.output('totalLevelIncome', sql.BigInt)
            request.output('Message', sql.NVarChar(sql.MAX));
            request.execute("GetIncomeByLevel", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    var responseData = result.recordsets.reverse()[1];
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        totalLevelIncome: result.output.totalLevelIncome,
                        data: responseData
                    });
                }
            });
        }
    });
};

// Get Education & Rank
/*
PARAMETERS :
{
    "param": {
        "user_id": "",
    }
}
*/
exports.getEduRank = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("user_id", sql.VarChar, param.user_id);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetEduRank", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    var responseData = result.recordsets.reverse()[1];
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: responseData
                    });
                }
            });
        }
    });
};

// Get Education & Rank
/*
PARAMETERS :
{
    "param": {
        "user_id": "",
    }
}
*/
exports.getGiftRewards = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("user_id", sql.VarChar, param.user_id);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetGiftRewards", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    var responseData = result.recordsets.reverse()[1];
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: responseData
                    });
                }
            });
        }
    });
};

// Get Autopool Earnings
/*
PARAMETERS :
{
    "param": {
        "user_id": "",
    }
}
*/
exports.getAutopoolIncome = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("user_id", sql.VarChar, param.user_id);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetAutopoolIncome", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    var responseData = result.recordsets.reverse()[1];
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        data: responseData
                    });
                }
            });
        }
    });
};