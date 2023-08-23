var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');
var multer = require("multer");
const KYCStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        var userid = req.query.userid;
        const dir = path.dirname(path.dirname(__dirname)) + `/Docs/KYC/${userid}`

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

var upload = multer({ storage: KYCStorage });

var userController = require('../controllers/userController');
var ticketController = require('../controllers/ticketController');
var payoutController = require('../controllers/payoutController');
var teamController = require('../controllers/teamController');
var depositController = require('../controllers/depositController');
var earningController = require('../controllers/earningController');
var pinController = require('../controllers/pinController');
var reportController = require('../controllers/reportController');

// Users
router.post("/api/GetUsers", userController.getUsers);
router.post("/api/GetUserDetails", userController.getUserDetails);
router.post("/api/AddUser", userController.addUser);
router.post("/api/ChangeUserPassword", userController.changeUserPassword);
router.post("/api/ValidateUser", userController.validateUser);
router.post("/api/KYCRequest", upload.array("files"), userController.KYCRequest);
router.post("/api/GetDashboardData", userController.getDashboardData);
router.post("/api/GetBalance", userController.getBalance);

router.post("/api/GetTickets", ticketController.getTickets);
router.post("/api/AddTicket", ticketController.addTicket);
router.post("/api/DeleteTicket", ticketController.deleteTicket);

router.post("/api/GetWithdrawRequests", payoutController.getWithdrawRequests);
router.post("/api/WithdrawRequest", payoutController.withdrawRequest);
router.post("/api/DeleteWithdrawRequest", payoutController.deleteWithdrawRequest);

router.post("/api/GetDirectTeam", teamController.getDirectTeam);
router.post("/api/GetTeamByLevel", teamController.getTeamByLevel);
router.post("/api/GetAutopoolTeamByLevel", teamController.getAutopoolTeamByLevel);

router.post("/api/DepositRequest", depositController.depositRequest);
router.post("/api/GetDepositRequests", depositController.getDepositRequests);
router.post("/api/DeleteDepositRequest", depositController.deleteDepositRequest);

router.post("/api/GetDirectEarnings", earningController.getDirectEarnings);
router.post("/api/GetIncomeByLevel", earningController.getIncomeByLevel);
router.post("/api/GetAutopoolIncome", earningController.getAutopoolIncome);
router.post("/api/GetEduRank", earningController.getEduRank);
router.post("/api/GetGiftRewards", earningController.getGiftRewards);

// Admins
router.post("/api/GetPendingTickets", ticketController.getPendingTickets);
router.post("/api/GetRespondedTickets", ticketController.getRespondedTickets);
router.post("/api/respondTicket", ticketController.respondTicket);

router.post("/api/GetPendingKYCRequests", userController.getPendingKYCRequests);
router.post("/api/GetKYCDocuments", userController.getKYCDocuments);
router.post("/api/ApproveKYC", userController.approveKYC);
router.post("/api/RevokeKYC", userController.revokeKYC);
router.post("/api/GetApprovedKYCRequests", userController.getApprovedKYCRequests);
router.post("/api/DeactivateUser", userController.deactivateUser);
router.post("/api/ActivateUser", userController.activateUser);

router.post("/api/GetPendingWithdrawRequests", payoutController.getPendingWithdrawRequests);
router.post("/api/RespondWithdrawRequest", payoutController.respondWithdrawRequest);
router.post("/api/GetRespondedWithdrawRequests", payoutController.getRespondedWithdrawRequests);

router.post("/api/MarkAsRewardedAchievement", earningController.markAsRewardedAchievement);
router.post("/api/GetAchievements", earningController.getAchievements);

router.post("/api/GetPendingDepositRequests", depositController.getPendingDepositRequests);
router.post("/api/RespondDepositRequest", depositController.respondDepositRequest);
router.post("/api/GetRespondedDepositRequests", depositController.getRespondedDepositRequests);

router.post("/api/GetAutopoolMembers", teamController.getAutopoolMembers);

router.post("/api/GetUserDetailsByUserID", userController.getUserDetailsByUserID);
router.post("/api/GetUserDetailsForAdmin", userController.getUserDetailsForAdmin);

router.post("/api/GeneratePins", pinController.generatePins);
router.post("/api/GetUsedPins", pinController.getUsedPins);
router.post("/api/GetUnusedPins", pinController.getUnusedPins);
router.post("/api/TogglePin", pinController.togglePin);
router.post("/api/GetPinsForUser", pinController.getPinsForUser);
router.post("/api/ValidatePin", pinController.validatePin);

router.post("/api/GetReportData", reportController.getReportData);

module.exports = router;