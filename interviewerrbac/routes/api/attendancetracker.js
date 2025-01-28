const express = require("express");

const {
  getSlots,
  submitUserActions,
  loadData,
} = require("../../controllers/attendanceContoller");
const { getStudents } = require("../../controllers/studentController");

const router = express.Router();

router.get("/getstudents/:id", getStudents);

router.get("/getslots/:id", getSlots);

router.post("/submit-useractions", submitUserActions);

router.get("/load-data/:id", loadData);

module.exports = router;
