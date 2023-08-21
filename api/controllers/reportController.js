var serverConfig = require('../config.js')
var sql = require("mssql");

// Get Report Data
/*
PARAMETERS :
{
    "param": {
        "from": "",
        "to": "",
    }
}
*/
exports.getReportData = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("from", sql.Date, param.from);
            request.input("to", sql.Date, param.to);
            request.output('total', sql.Float)
            request.output('admin', sql.Float)
            request.output('tds', sql.Float)
            request.output('gst', sql.Float)
            request.output('digitalToken', sql.Float)
            request.output('userEarnings', sql.Float)
            request.output('available_bal', sql.Float)
            request.output('withdrawed_bal', sql.Float)
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetReportData", function (err, result) {
                if (err) {
                    console.error(err);
                    sql.close();
                    return res.status(500).send(err);
                } else {
                    sql.close();
                    console.info(result.output.Message)
                    return res.status(200).send({
                        message: result.output.Message,
                        total: result.output.total,
                        admin: result.output.admin,
                        gst: result.output.gst,
                        tds: result.output.tds,
                        digitalToken: result.output.digitalToken,
                        userEarnings: result.output.userEarnings,
                        available_bal: result.output.available_bal,
                        withdrawed_bal: result.output.withdrawed_bal,
                        data: result.recordsets.reverse()[1]
                    });
                }
            });
        }
    });
};
