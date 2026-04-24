const pdfParse = require('pdf-parse');
const { generateInterviewReport } = require('../services/ai.service');
const interviewReportModel = require('../model/interviewReport.model');

async function generateInterviewReportController(req, res) {
    const resumeFile = req.file;

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    const {selfDescription, jobDescription} = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user._id,
        resume: resumeContent.text,
        jobDescription,
        selfDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message: "Interview Report generated successfully",
        interviewReport
    })
}

module.exports = {
    generateInterviewReportController
}