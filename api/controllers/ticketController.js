var serverConfig = require('../config.js')
var sql = require("mssql");

// Get Tickets by User
/*
PARAMETERS :
{
    "param": {
        "user_id": ""
    }
}
*/
exports.getTickets = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("user_id", sql.VarChar, param.user_id);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetTickets", function (err, result) {
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

// Get Pending Tickets
exports.getPendingTickets = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetPendingTickets", function (err, result) {
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

// Add Ticket
/*
PARAMETERS :
{
    "param": {
        "subject": "",
        "description": "",
        "user_id": ""
    }
} 
*/
exports.addTicket = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("subject", sql.VarChar, param.subject);
            request.input("description", sql.VarChar, param.description);
            request.input("user_id", sql.VarChar, param.user_id);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("AddTicket", function (err, result) {
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

// Respond Ticket
/*
PARAMETERS :
{
    "param": {
        "ticket_no": "",
        "response": "",
    }
} 
*/
exports.respondTicket = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("ticket_no", sql.VarChar, param.ticket_no);
            request.input("response", sql.VarChar, param.response);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("RespondTicket", function (err, result) {
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

// Get Responded Tickets
exports.getRespondedTickets = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("GetRespondedTickets", function (err, result) {
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

// Delete Ticket
/*
PARAMETERS :
{
    "param": {
        "ticket_no": "",
    }
}
*/
exports.deleteTicket = function (req, res) {
    var param = req.body.param;
    sql.connect(serverConfig, function (err) {
        if (err) console.error(err);
        else {
            var request = new sql.Request();
            request.input("ticket_no", sql.VarChar, param.ticket_no);
            request.output('Message', sql.NVarChar(sql.MAX))
            request.execute("DeleteTicket", function (err, result) {
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