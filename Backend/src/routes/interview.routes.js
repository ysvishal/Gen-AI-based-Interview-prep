const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const interviewRouter = express.Router();
const upload = require('../middlewares/file.middleware')
const interviewController = require('../controllers/interview.controller')
/**
 * @route POST /api/interview
 * @description generate a new interview report based on the user resume, self desc and job desc
 * @access private
 */
interviewRouter.post('/', authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController);

module.exports = interviewRouter;