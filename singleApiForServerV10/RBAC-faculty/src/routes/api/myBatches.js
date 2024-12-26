const express = require("express");
const {
  insertBatchDetails,
  fetchCourseDetails,
} = require("../../controllers/myBatches");

const router = express.Router();

router.post("/insertbatchdetails", insertBatchDetails);

router.get("/fetch-course-details/:userId", fetchCourseDetails);

module.exports = router;
