const express = require("express");

const router = express.Router();

const rbac = require("./rbac");
const attendancetrackerRoute = require("./attendancetracker");
const facultyCurriculamRoute = require("./facultyCurriculam");
const interviewerRoute = require("./interviewer");
const myBatchesRoute = require("./myBatches");
const vlabsRoute = require("./vlabs");

// Role Based Access Control
router.use("/rbac", rbac);

router.use("/attendancetracker", attendancetrackerRoute);

// Faculty Curriculum
// Pending Approval
router.use("/facultycurriculam", facultyCurriculamRoute);

router.use("/interviewer", interviewerRoute);

router.use("/mybatches", myBatchesRoute);

router.use("/vlabs", vlabsRoute);

module.exports = router;
