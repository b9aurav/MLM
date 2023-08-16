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
                        data: result.recordset
                    });
                }
            });
        }
    });
};
